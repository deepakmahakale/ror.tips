---
layout: single
title: How to delete recurring tasks in solid queue?
description: &description >
  This article explains how to delete recurring tasks from Solid Queue.
excerpt: *description
date: 2026-08-21
categories:
  - Rails
tags:
  - Solid Queue
  - Active Job
header:
  og_image: /assets/images/opengraph/2026-08-21-how-to-delete-recurring-tasks-in-solid-queue.png
---

Solid Queue stores recurring tasks in the `solid_queue_recurring_tasks` table. Removing a task from `config/recurring.yml` does not delete the existing records.

## List recurring tasks
```ruby
SolidQueue::RecurringTask.pluck(:key, :class_name, :command, :schedule)
```

## Delete a specific task
```ruby
SolidQueue::RecurringTask.find_by(key: "clear_solid_queue_finished_jobs")&.destroy
```

## Delete all recurring tasks
```ruby
SolidQueue::RecurringExecution.delete_all
SolidQueue::RecurringTask.delete_all
```
Restart `bin/jobs` after deleting so the scheduler does not keep the old task in memory.

#### NOTE:
If Solid Queue uses a separate database, run this in an environment where `SolidQueue::RecurringTask` is connected to the queue database.

## References
- [Solid Queue - Recurring tasks](https://github.com/rails/solid_queue#recurring-tasks){:target="_blank"}
