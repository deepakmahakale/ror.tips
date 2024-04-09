---
layout: single
title: How to check if a column already exists in rails?
description: &description >
  This article explains how to check if a column already exists in a table in rails.
excerpt: *description
date: 2024-04-15
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-04-15-how-to-check-if-a-column-already-exists-in-rails.png
---

Developers often need to check if a column already exists in the database schema.
Rails provides built-in method to accomplish this effectively.

## Syntax

```ruby
column_exists?(table_name, column_name, type = nil, **options)
```

## Example

Here is an example of how to use `column_exists?` method:

```ruby
class AddEmailToUsers < ActiveRecord::Migration[7.1]
  def change
    unless column_exists?(:users, :email)
      add_column(:users, :email, :string)
    end
  end
end
```

Following are some more examples of how to use `column_exists?` method:

```ruby
# Checks if a column exists
column_exists?(:users, :email)

# Checks if a column with string type exists
column_exists?(:users, :email, :string)

# Checks if a column exists with a specific definition
column_exists?(:products, :name, :string, limit: 100)
column_exists?(:products, :name, :string, null: false)
column_exists?(:products, :status, :string, default: 'pending')
column_exists?(:products, :price, :decimal, precision: 8, scale: 2)
```

**NOTE:** This can also be re-written using the `if_not_exists` option in the `add_column` method.

```ruby
class AddEmailToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column(:users, :email, :string, if_not_exists: true)
  end
end
```

## References

- [Rails API Documentation - column_exists?](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-column_exists-3F){:target="_blank"}
- [Rails API Documentation - add_column](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_column){:target="_blank"}
