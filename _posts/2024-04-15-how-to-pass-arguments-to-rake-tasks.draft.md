---
layout: single
title: How to pass arguments to rake tasks?
description: &description >
  This article explains how to pass multiple arguments to the rake tasks.
excerpt: *description
date: 2024-04-15
categories:
  - Rails
  - Rake
tags:
  - Rake Task
header:
  og_image: /assets/images/opengraph/2024-04-15-how-to-pass-arguments-to-rake-tasks.png
---

We use rake tasks for automating various repetitive tasks.
Sometimes, we may need to pass arguments to these tasks to make them more flexible and dynamic.

Here's how you can pass arguments to Rake task:

## Syntax

```ruby
namespace :my_namespace do
  desc "My task description"
  task :my_task, [:arg1, :arg2] => :environment do |_, args|
    args.with_defaults(arg1: "default1", arg2: "default2")

    puts "Argument 1: #{args.arg1}"
    puts "Argument 2: #{args.arg2}"
  end
end
```

## Example

```ruby
namespace :data do
  desc "Syns data from external source"
  task :sync, [:limit] => :environment do |_, args|
    args.with_defaults(limit: 100)

    DataSyncService.sync(limit: args.limit.to_i)
  end
end
```

In this example, the `data:sync` task accepts a `:limit` argument.
It sets a default value of `limit` to `100` using `with_defaults`.

The task then calls a `DataSyncService` with `limit` as an argument.

To run the task, use the following command:

```sh
rake data:sync[50]
```

**NOTE:**
If you are a ZSH user you may get the following error:<br>
`zsh: no matches found: data:sync[50]`<br>
In that case, you can escape the square brackets like this:
{: .notice--danger}

```sh
rake data:sync\[50\]
```

## References

- [Rails Guides: Custom Rake Tasks](https://guides.rubyonrails.org/command_line.html#custom-rake-tasks){:target="_blank"}
