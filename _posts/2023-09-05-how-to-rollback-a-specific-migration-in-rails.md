---
layout: single
title: How to rollback a specific migration in rails?
description: &description >
  This article explains how to rollback a specific migration in rails.
excerpt: *description
date: 2023-09-05
last_modified_at: 2024-03-16
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2023-09-05-how-to-rollback-a-specific-migration-in-rails.png
---

In order to rollback a specific migration we need to specify the `VERSION` of the migration.

For example:

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

## References

- [Rails Guides - Running Migrations](https://guides.rubyonrails.org/active_record_migrations.html#running-migrations){:target="_blank"}
