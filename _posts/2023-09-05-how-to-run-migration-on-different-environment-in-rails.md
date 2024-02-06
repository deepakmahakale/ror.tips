---
layout: posts
title: How to run migration on different environment?
description: >
  Need to execute the database migrations on a different environment?
  Let's see how to do it.
categories:
  - migration
date: 2023-09-05
image: /images/og/how-to-run-migration-on-different-environment-in-rails.jpg
---

By default `rails db:migrate` will run in the `development` environment.

In order to run migrations on another environment we need to specify the
`RAILS_ENV` environment variable.

For example:

```bash
RAILS_ENV=test rails db:migrate
```

The above command will run the db migrations against the `test` environment.
