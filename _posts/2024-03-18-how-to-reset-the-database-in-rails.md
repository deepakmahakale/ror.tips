---
layout: single
title: "How to reset the database in Rails (db:reset)"
description: &description >
  Reset the database in Rails with db:reset, db:migrate:reset or db:seed:replant, which one to use, and how to fix "database is being accessed by other users".
excerpt: *description
date: 2024-03-18
last_modified_at: 2026-11-12
categories:
  - Rails
tags:
  - Database
header:
  og_image: /assets/images/opengraph/2024-03-18-how-to-reset-the-database-in-rails.png

---

When working on Ruby on Rails projects,
there are times when we need to reset the database to its initial state,
clearing all existing data.

This process is essential for development,
testing,
or troubleshooting purposes.

## Quick answer

| Command | What it does |
|---|---|
| `bin/rails db:reset` | Drop, create, load `db/schema.rb`, run seeds |
| `bin/rails db:migrate:reset` | Drop, create, run **every migration** |
| `bin/rails db:seed:replant` | Keep the schema, empty all tables, run seeds |
| `bin/rails db:truncate_all` | Keep the schema, empty all tables |

## Understanding the `db:reset` command

The `rails db:reset` command will drop the database and set it up again.

To reset the database run:

```bash
$ bin/rails db:reset
```

This is equivalent to executing the following commands

```bash
bin/rails db:drop db:setup
```

`db:setup` creates the database, loads `db/schema.rb` (or `structure.sql`) and runs `db/seeds.rb`.

**Note:** `db:reset` does **not** run your migrations. It loads the schema file, so it's fast, but if `schema.rb` is out of date you get the old schema.
{: .notice--info}

## Reset by running all migrations: `db:migrate:reset`

To check that every migration still runs cleanly from scratch:

```bash
bin/rails db:migrate:reset
bin/rails db:seed   # migrate:reset doesn't seed
```

## Empty the tables but keep the schema

```bash
# Delete all rows and run seeds again (Rails 6+)
bin/rails db:seed:replant

# Delete all rows only (Rails 6+)
bin/rails db:truncate_all
```

These don't drop the database, so they work while a server or console is connected.

## Reset the test database

```bash
RAILS_ENV=test bin/rails db:reset
```

Usually you don't need to: `bin/rails test` keeps the test schema in sync, and `bin/rails db:test:prepare` rebuilds it.

## Common errors

### `PG::ObjectInUse: database is being accessed by other users`

Something still holds a connection, so the database can't be dropped. Stop the Rails server, consoles, background job workers and any database GUI, then try again. Or use `db:seed:replant`, which doesn't drop.

### `ActiveRecord::ProtectedEnvironmentError`

Rails refuses to drop a production database. That's deliberate. If you really mean it (for example a staging copy):

```bash
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 RAILS_ENV=production bin/rails db:reset
```

**Caution:** These commands delete data.
Please ensure you are executing this command in the correct environment and have a backup of the data if required.
{: .notice--warning}

{% include migration-guides.html %}

## References

- [Rails Guides: Resetting the Database](https://guides.rubyonrails.org/active_record_migrations.html#resetting-the-database){:target="_blank"}
