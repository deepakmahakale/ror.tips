---
layout: single
title: How to add an index in rails?
description: &description >
  This article explains how to add an index in rails.
excerpt: *description
date: 2024-04-15
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-04-15-how-to-add-an-index-in-rails.png
---
## Syntax

```ruby
add_index(table_name, column_name, **options)
```

## Example

Add an index to the `email` column in the `users` table.

```ruby
add_index :users, :email
```

Add a `uniq` index to the `email` column in the `users` table.

```ruby
add_index :users, :email, unique: true
```

Rails Command:

```bash
$ rails generate migration add_index_to_users email:index
      invoke  active_record
      create    db/migrate/20240801141018_add_index_to_users.rb
```

The above command will generate the following migration.
You may need to delete the `add_column` line if the column already exists.

```ruby
class AddIndexToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :email, :string
    add_index :users, :email
  end
end
```

## References

- [Rails API Documentation - add_index](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index){:target="_blank"}
