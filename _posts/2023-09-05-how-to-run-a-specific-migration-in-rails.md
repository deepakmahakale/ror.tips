---
layout: single
title: How to run a specific migration?
description: >
  Need to execute a specific database migration?
  Let's see how to do it.
date: 2023-09-05
categories:
  - rails
tags:
  - database
  - migration
image: /images/og/how-to-run-a-specific-migration-in-rails.jpg
---

In order to run a specific migration we need to specify the `VERSION` of the migration.

For example:

```bash
# RAILS >= 5.0
rails db:migrate:up VERSION=20230906123456

# RAILS < 5.0
rake db:migrate:up VERSION=20230906123456
```

If you want to rollback a specific migration

```bash
# RAILS >= 5.0
rails db:migrate:down VERSION=20230906123456

# RAILS < 5.0
rake db:migrate:down VERSION=20230906123456
```

#### NOTE:

If a version is not found rails will throw an exception

```bash
rails db:migrate:down VERSION=20000906123456

bin/rails aborted!
ActiveRecord::UnknownMigrationVersionError:

No migration with version number 20000906123456.
```
