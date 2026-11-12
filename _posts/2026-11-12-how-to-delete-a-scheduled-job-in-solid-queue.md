---
layout: single
title: "How to delete a scheduled job in Solid Queue"
description: &description >
  Cancel a job you scheduled with set(wait:) or set(wait_until:) in Solid Queue: find it by ID, class or arguments and discard it from the console.
excerpt: *description
date: 2026-11-12
categories:
  - Rails
tags:
  - Solid Queue
  - Active Job
header:
  og_image: /assets/images/opengraph/2026-11-12-how-to-delete-a-scheduled-job-in-solid-queue.png
---

Jobs enqueued with `set(wait: …)` or `set(wait_until: …)` sit in the `solid_queue_scheduled_executions` table until they're due. Active Job has no "cancel" method, but Solid Queue's own models let you discard them.

## Quick answer

```ruby
job = SolidQueue::Job.find(id)
job.discard if job.scheduled?
```

`discard` deletes the job and its scheduled execution, so it never runs.

## Keep the ID when you schedule it

The easiest way to cancel a job later is to remember which one it was. `perform_later` returns the Active Job, and Solid Queue sets `provider_job_id` to its own job ID:

```ruby
job = ReminderJob.set(wait: 3.days).perform_later(user)

job.provider_job_id # => id of the SolidQueue::Job
job.job_id          # => Active Job's UUID
```

Store either one, for example on the record the job is about, and use it to cancel:

```ruby
SolidQueue::Job.find_by(id: user.reminder_job_id)&.discard
# or by the Active Job UUID
SolidQueue::Job.find_by(active_job_id: user.reminder_active_job_id)&.discard
```

## Find scheduled jobs by class

```ruby
scheduled = SolidQueue::Job.joins(:scheduled_execution).where(class_name: "ReminderJob")

scheduled.pluck(:id, :scheduled_at)
scheduled.find_each(&:discard)
```

The `joins(:scheduled_execution)` keeps it to jobs that are still waiting. Jobs that are running or already finished are left alone.

## Find a scheduled job by its arguments

Arguments are stored as JSON in the `arguments` column, under the `"arguments"` key. Records are stored as GlobalIDs:

```ruby
job.arguments["arguments"]
# => [{"_aj_globalid"=>"gid://my-app/User/42"}, "weekly"]
```

So to cancel the reminder for one user:

```ruby
gid = user.to_global_id.to_s

SolidQueue::Job.joins(:scheduled_execution)
  .where(class_name: "ReminderJob")
  .select { |job| job.arguments["arguments"].include?({ "_aj_globalid" => gid }) }
  .each(&:discard)
```

This loads the matching class's scheduled jobs into memory, which is fine for a few thousand. For more, narrow it in SQL first:

```ruby
SolidQueue::Job.joins(:scheduled_execution)
  .where(class_name: "ReminderJob")
  .where("arguments LIKE ?", %(%"#{gid}"%))
```

The surrounding quotes stop `User/42` from also matching `User/420`.

## Running jobs can't be discarded

```ruby
job.discard
# => SolidQueue::Execution::UndiscardableError: Can't discard a job in progress
```

A job that a worker has already claimed has to finish (or fail). If you need to stop work that may already be running, make the job check whether it should still run:

```ruby
class ReminderJob < ApplicationJob
  def perform(user)
    return if user.unsubscribed? # cancelled after it was scheduled

    ReminderMailer.with(user:).weekly.deliver_now
  end
end
```

This guard is a good idea anyway: it also covers jobs that were scheduled before you cancelled.

## Recurring tasks are different

Jobs from `config/recurring.yml` are created by the scheduler on every run. Discarding one only skips that run. To stop them, see [how to delete recurring tasks in Solid Queue](/rails/how-to-delete-recurring-tasks-in-solid-queue/).

#### NOTE:
If Solid Queue uses its own database (the Rails 8 default), the `SolidQueue::*` models already connect to it, so these commands work from a normal `bin/rails console`. On Kamal, open one with `kamal app exec -i 'bin/rails console'`. See [how to run the Rails console on Kamal](https://kamal.wiki/how-to-run-rails-console-on-kamal/).

## References

- [Solid Queue on GitHub](https://github.com/rails/solid_queue){:target="_blank"}
- [Stack Overflow: Destroying scheduled jobs from Solid Queue](https://stackoverflow.com/questions/78731735){:target="_blank"}
