---
layout: single
title: How to reset the database for a rails application?
description: &description >
  This article explains how to reset the database for a rails application.
excerpt: *description
date: 2024-03-18
categories:
  - Rails
tags:
  - Database
header:
  og_image: /assets/images/opengraph/2024-03-18-how-to-reset-the-database-in-rails.png

---

When working on Ruby on Rails projects,
there are times when we need to reset the database to its initial state,
clearing all existing data and schema migrations.

This process is essential for development,
testing,
or troubleshooting purposes.

## Understanding the `db:reset` command

The `rails db:reset` command will drop the database and set it up again.

To reset the databse run:

```bash
$ rails db:reset
```

This is equivalent to executing the following commands

```bash
rails db:drop db:setup
```

**Caution:** This command will drop the database resulting in data loss.
Please ensure you are executing this command in the correct environment and have a backup of the data if required.
{: .notice--warning}

## References

- [Rails Guides - Resetting the Database](https://guides.rubyonrails.org/active_record_migrations.html#resetting-the-database)
