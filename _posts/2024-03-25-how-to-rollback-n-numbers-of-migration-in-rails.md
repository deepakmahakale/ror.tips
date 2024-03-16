---
layout: single
title: How to rollback N numbers of migration in rails?
description: &description >
  This article explains how to rollback N numbers of migration in rails.
excerpt: *description
date: 2024-03-25
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-03-25-how-to-rollback-n-numbers-of-migration-in-rails.png
---
Sometimes, We need to rollback a specific number of migrations to undo series of changes.

To rollback **n** numbers of migrations, you can use the `db:rollback` command along with the **`STEP`** option, specifying the number of migrations to rollback.

For example, to rollback the last **3** migrations, you can run:

```bash
# RAILS >= 5.0
rails db:rollback STEP=3

# RAILS < 5.0
rake db:rollback STEP=3
```

This command will revert the last 3 migrations,
undoing their changes to the database schema and data.

This is useful for reverting accidental changes, testing data migrations, or resetting the database to a previous state.

## References

- [Rails Guides - Rolling back](https://guides.rubyonrails.org/active_record_migrations.html#rolling-back)
