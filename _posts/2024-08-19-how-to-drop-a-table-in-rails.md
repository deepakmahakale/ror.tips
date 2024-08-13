---
layout: single
title: How to drop a table in rails?
description: &description >
  This article explains how to drop a table in rails - the recommended way.
excerpt: *description
date: 2024-08-19
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-08-19-how-to-drop-a-table-in-rails.png
---

## Table

Drop an articles table

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
    drop_table :articles do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false

      t.timestamps
    end
  end
end
```

We don't necessarily need to specify the columns in the `drop_table` method.
The `drop_table` method will drop the table with all its columns.

But, the above approach ensures that in case of a rollback, the table will be created with the specified columns.

## References

- [https://guides.rubyonrails.org/active_record_migrations.html](https://guides.rubyonrails.org/active_record_migrations.html){:target="_blank"}

## Note

All the commands have been tested with rails 7.1 and the result may differ with prior versions
