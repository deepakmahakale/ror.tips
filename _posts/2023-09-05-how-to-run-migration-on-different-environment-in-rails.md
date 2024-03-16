---
layout: single
title: How to run migration on different environment in rails?
description: &description >
  This article explains how to run migrations on a different environment in rails.
excerpt: *description
date: 2023-09-05
last_modified_at: 2024-03-16
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2023-09-05-how-to-run-migration-on-different-environment-in-rails.png
---

By default `rails db:migrate` will run in the `development` environment.
Let's see how to run migrations on a different environment.

In order to run migrations on another environment we need to specify the
`RAILS_ENV` environment variable.

For example:

```bash
RAILS_ENV=test rails db:migrate
```

The above command will run the db migrations against the `test` environment.

## References

- [Rails Guides - Running Migrations in Different Environments](https://guides.rubyonrails.org/active_record_migrations.html#running-migrations-in-different-environments)
