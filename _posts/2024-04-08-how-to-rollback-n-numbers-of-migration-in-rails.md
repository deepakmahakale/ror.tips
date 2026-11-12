---
layout: single
title: "How to rollback a migration in Rails (last, specific or N steps)"
description: &description >
  Roll back Rails migrations with db:rollback, STEP=N and db:migrate:down VERSION=…, find the version to use, and fix the common rollback errors.
excerpt: *description
date: 2024-04-08
last_modified_at: 2026-11-12
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-04-08-how-to-rollback-n-numbers-of-migration-in-rails.png
redirect_from:
  - /rails/how-to-rollback-a-specific-migration-in-rails/
---

## Quick answer

```bash
# Roll back the last migration
bin/rails db:rollback

# Roll back the last 3 migrations
bin/rails db:rollback STEP=3

# Roll back one specific migration (only that one)
bin/rails db:migrate:down VERSION=20240408123456

# Roll back everything after a version
bin/rails db:migrate VERSION=20240408123456
```

On Rails < 5.0, use `rake` instead of `bin/rails`.

## Roll back the last migration

```bash
bin/rails db:rollback
```

This reverses the most recent migration (its `down` method, or the reverse of `change`) and removes its version from the `schema_migrations` table. `db/schema.rb` is updated to match.

## Roll back N migrations

Use `STEP` to undo the last N migrations, newest first:

```bash
bin/rails db:rollback STEP=3
```

Useful when a series of migrations needs to be undone together.

## Roll back a specific migration

To roll back one migration without touching the ones that ran after it, pass its version to `db:migrate:down`:

```bash
bin/rails db:migrate:down VERSION=20240408123456
```

The version is the timestamp at the start of the migration file name, for example `db/migrate/20240408123456_add_status_to_orders.rb`.

To run it again later, use `db:migrate:up` with the same version. See [how to run a specific migration in Rails](/rails/how-to-run-a-specific-migration-in-rails/).

## Roll back to a version (everything after it)

`db:migrate` with a `VERSION` older than the current one migrates **down** to that version, reverting every migration that ran after it:

```bash
bin/rails db:migrate VERSION=20240101000000
```

## Find the version to roll back

`db:migrate:status` lists every migration with its version and whether it is up or down:

```bash
$ bin/rails db:migrate:status

database: db/development.sqlite3

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20240401090000  Create orders
   up     20240408123456  Add status to orders
```

## Roll back and run again: `db:migrate:redo`

While writing a migration, `redo` rolls it back and runs it again in one command:

```bash
bin/rails db:migrate:redo          # last migration
bin/rails db:migrate:redo STEP=3   # last 3 migrations
```

## Other environments and databases

```bash
# Test or production database
RAILS_ENV=test bin/rails db:rollback

# One database in a multi-database app (Rails 6.1+)
bin/rails db:rollback:primary
bin/rails db:migrate:down:primary VERSION=20240408123456
```

More in [how to run migrations on a different environment](/rails/how-to-run-migration-on-different-environment-in-rails/).

## Undo a migration you haven't shared yet

If the migration only ran on your machine, roll it back first, then delete the file:

```bash
bin/rails db:rollback
bin/rails destroy migration AddStatusToOrders
```

`destroy migration` only deletes the file. It doesn't touch the database, so always roll back first.

## Common errors

### `ActiveRecord::IrreversibleMigration`

Rails can't work out how to reverse the migration. For example, `remove_column` without a type, or `execute` with raw SQL inside `change`. Give Rails what it needs, or write `up` and `down` yourself:

```ruby
# Reversible: Rails knows the column type to add back
remove_column :orders, :status, :string

# Or spell out both directions
def up
  execute "UPDATE orders SET status = 'pending' WHERE status IS NULL"
end

def down
  # nothing to undo
end
```

### `ActiveRecord::UnknownMigrationVersionError`

```
bin/rails aborted!
ActiveRecord::UnknownMigrationVersionError:
No migration with version number 20000906123456.
```

The version doesn't match any file in `db/migrate`. Copy it from `bin/rails db:migrate:status`.

## Rolling back in production

- Take a database backup first. Rolling back a migration that dropped a column or table does not bring the data back.
- Rolling back a deployed migration usually means deploying a fix as well. Most Rails Docker images run `bin/rails db:prepare` on boot, so a migration file that's still in the code runs again on the next deploy.
- On Kamal, run it with `kamal app exec 'bin/rails db:rollback'`. See [how to run a rake task on Kamal](https://kamal.wiki/how-to-run-a-rake-task-on-kamal/).

{% include migration-guides.html %}

## References

- [Rails Guides: Rolling back](https://guides.rubyonrails.org/active_record_migrations.html#rolling-back){:target="_blank"}
- [Rails Guides: Running specific migrations](https://guides.rubyonrails.org/active_record_migrations.html#running-specific-migrations){:target="_blank"}
