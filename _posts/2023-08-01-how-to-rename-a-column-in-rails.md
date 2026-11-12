---
layout: single
title: "How to rename a column in Rails (rename_column migration)"
description: &description >
  Rename a column in Rails with rename_column in a migration, rename several columns at once, and rename safely in production without downtime.
excerpt: *description
date: 2023-08-01
last_modified_at: 2026-11-12
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2023-08-01-how-to-rename-a-column-in-rails.png
---

## Syntax

```ruby
rename_column(table_name, column_name, new_column_name)
```

## Example

```ruby
rename_column(:users, :email_id, :email)
```

## Generate the migration

```bash
$ bin/rails generate migration RenameEmailIdToEmailInUsers
      invoke  active_record
      create    db/migrate/20230906131708_rename_email_id_to_email_in_users.rb
```

The above command will generate an empty migration:

```ruby
class RenameEmailIdToEmailInUsers < ActiveRecord::Migration[7.1]
  def change
  end
end
```

We need to modify it to:

```ruby
class RenameEmailIdToEmailInUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :email_id, :email
  end
end
```

Then run it:

```bash
bin/rails db:migrate
```

`rename_column` is reversible, so `bin/rails db:rollback` renames the column back. See [how to rollback a migration](/rails/how-to-rollback-n-numbers-of-migration-in-rails/).

## Rename several columns at once

Use `change_table` with `t.rename`:

```ruby
class RenameNameColumnsInUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users do |t|
      t.rename :fname, :first_name
      t.rename :lname, :last_name
    end
  end
end
```

## What happens to indexes?

Indexes on the column are kept. If an index uses the default Rails name (for example `index_users_on_email_id`), `rename_column` renames it too (`index_users_on_email`). Indexes with custom names keep their names.

## Rename a column safely in production

Renaming a column that running code still reads breaks the app between the migration and the deploy finishing: the old code asks for `email_id`, which no longer exists. On a busy app, do it in steps instead:

1. Add the new column and write to both columns.
2. Backfill the new column from the old one.
3. Switch reads to the new column and deploy.
4. Tell Active Record to ignore the old column, then drop it in a later deploy:

   ```ruby
   class User < ApplicationRecord
     self.ignored_columns += ["email_id"]
   end
   ```

The [strong_migrations](https://github.com/ankane/strong_migrations){:target="_blank"} gem flags `rename_column` and walks you through this.

For a quick rename where old code still calls the old name, `alias_attribute` can bridge the gap:

```ruby
class User < ApplicationRecord
  alias_attribute :email_id, :email
end
```

## Common mistakes

- **Forgetting to update the code.** Search the app for the old name: models, validations, strong parameters, views, serializers and SQL strings.
- **Renaming in `change` with raw SQL.** `execute "ALTER TABLE …"` isn't reversible. Use `rename_column`, or write `up` and `down`.

{% include migration-guides.html %}

## References

- [Rails API: rename_column](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-rename_column){:target="_blank"}
- [Rails Guides: Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html){:target="_blank"}
