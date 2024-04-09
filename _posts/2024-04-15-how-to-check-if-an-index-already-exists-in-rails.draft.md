---
layout: single
title: How to check if an index already exists in rails?
description: &description >
  This article explains efficient way to check if an index already exists on a table in rails.
excerpt: *description
date: 2024-04-15
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-04-15-how-to-check-if-an-index-already-exists-in-rails.png
---

Rails provides a straightforward way to check if an index exists using the `index_exists?` method.

## Syntax

```ruby
index_exists?(table_name, column_name, **options)
```

## Example

Here's an example of how to use `index_exists?`

```ruby
class AddIndexToUsersEmail < ActiveRecord::Migration[7.1]
  def change
    unless index_exists?(:users, :email)
      add_index(:users, :email)
    end
  end
end
```

Following are some more examples of how to use `index_exists?` method:

```ruby
# Checks if an index on multiple columns exists
index_exists?(:users, [:provider, :auth_id])

# Checks if a unique index exists
index_exists?(:users, :email, unique: true)

# Checks if an index with a custom name exists
index_exists?(:users, :email, name: "idx_email")
```

**NOTE:** This can also be re-written using the `if_not_exists` option in the `add_index` method.

```ruby
class AddIndexToUsersEmail < ActiveRecord::Migration[7.1]
  def change
    add_index(:users, :email, if_not_exists: true)
  end
end
```

## References

- [Rails API Documentation - index_exists?](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-index_exists-3F){:target="_blank"}
- [Rails API Documentation - add_index](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index){:target="_blank"}
