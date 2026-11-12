---
layout: single
title: "How to drop a table in Rails (drop_table migration)"
description: &description >
  Drop a table in Rails with a drop_table migration that can be rolled back, drop it only if it exists, and handle foreign keys and join tables.
excerpt: *description
date: 2024-08-19
last_modified_at: 2026-11-12
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-08-19-how-to-drop-a-table-in-rails.png
---

## Drop a Table

Drop users table

```bash
$ bin/rails generate migration DropUsers
```

Generates the following migration:

```ruby
# db/migrate/20240818074017_drop_users.rb
class DropUsers < ActiveRecord::Migration[7.1]
  def change
  end
end
```

Add the following code to the migration file to drop the table:

```ruby
class DropUsers < ActiveRecord::Migration[7.1]
  def change
    drop_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false

      t.timestamps
    end
  end
end
```

Then run `bin/rails db:migrate`.

We don't necessarily need to specify the columns in the `drop_table` method.
The `drop_table` method will drop the table with all its columns.

But, the above approach ensures that in case of a rollback, the table will be created with the specified columns.
Without the block, `drop_table :users` in `change` raises `ActiveRecord::IrreversibleMigration` on rollback. Copy the columns from `db/schema.rb`.

## Drop a table only if it exists

```ruby
drop_table :users, if_exists: true
```

## Tables with foreign keys

If other tables reference this one, PostgreSQL refuses to drop it (`PG::DependentObjectsStillExist`). Remove the foreign keys first:

```ruby
remove_foreign_key :orders, :users
drop_table :users
```

Or drop the dependent constraints along with the table (PostgreSQL):

```ruby
drop_table :users, force: :cascade
```

## Drop a join table

For tables created with `create_join_table`:

```ruby
drop_join_table :users, :roles
```

## Remove the model too

Dropping the table doesn't remove the model. Delete `app/models/user.rb` and its tests, or:

```bash
bin/rails destroy model User
```

**Caution:** `destroy model` also deletes the model's original `create_users` migration file. Don't run it for a table that's already in production. Write a `drop_table` migration and delete the model file by hand.
{: .notice--warning}

{% include migration-guides.html %}

## References

- [Rails API: drop_table](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-drop_table){:target="_blank"}
- [Rails Guides: Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html){:target="_blank"}

## Note

All the commands have been tested with rails 7.1 and the result may differ with prior versions
