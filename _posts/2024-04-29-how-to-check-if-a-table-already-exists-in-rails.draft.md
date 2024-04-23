---
layout: single
title: How to check if a table already exists in rails?
description: &description >
  This article explains how to check if a table already exists in a table in rails.
excerpt: *description
date: 2024-04-29
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-04-29-how-to-check-if-a-table-already-exists-in-rails.png
---

Developers often need to check if a table already exists in the database schema.
Rails provides built-in method to accomplish this effectively.

## Syntax

```ruby
table_exists?(table_name)
```

## Example

Here is an example of how to use `table_exists?` method:

```ruby
class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    unless table_exists?(:users)
      create_table(:users) do |t|
        t.column :name, :string
        t.column :email, :string, null: false

        t.timestamps
      end
    end
  end
end
```

**NOTE:** This can also be re-written using the `if_not_exists` option in the `create_table` method.

```ruby
class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table(:users, if_not_exists: true) do |t|
      t.column :name, :string
      t.column :email, :string, null: false

      t.timestamps
    end
  end
end
```

## References

- [Rails API Documentation - table_exists?](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-table_exists-3F){:target="_blank"}
- [Rails API Documentation - create_table](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-create_table){:target="_blank"}
