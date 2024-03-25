---
layout: single
title: How to check if an index already exists in rails?
description: &description >
  This article explains how to check if an index already exists on a table in rails.
excerpt: *description
date: 2024-04-01
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2024-04-01-how-to-check-if-an-index-already-exists-in-rails.png
---

## Syntax

```ruby
index_exists?(table_name, column_name, **options)
```

## Example

```ruby
class AddIndexToUsersEmail < ActiveRecord::Migration[7.1]
  def change
    unless index_exists?(:users, :email)
      add_index(:users, :email)
    end
  end
end
```

NOTE: This can also be re-written in the following way:

```ruby
class AddIndexToUsersEmail < ActiveRecord::Migration[7.1]
  def change
    add_index(:users, :email, if_not_exists: true)
  end
end
```
