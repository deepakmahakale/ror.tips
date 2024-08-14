---
layout: single
title: How to execute raw SQL in rails?
description: &description >
  This article explains how to write and execute raw SQL in rails.
excerpt: *description
date: 2024-08-21
categories:
  - Rails
tags:
  - SQL
header:
  og_image: /assets/images/opengraph/2024-08-21-how-to-execute-raw-sql-in-rails.png
---

## ActiveRecord::Base.connection.execute

Make use of `ActiveRecord::Base.connection.execute` to execute raw SQL queries in rails.

```ruby
result = ActiveRecord::Base.connection.execute("SELECT * FROM users")
```

## ActiveRecord::Base.connection.execute with complex query

While it is totally acceptable to use the string version of SQL query.

It is advised to use the string block for clean readable query.

```ruby
query = <<-SQL
  SELECT *
  FROM articles
  INNER JOIN users
          ON users.id = articles.user_id
  ORDER BY articles.created_at DESC
SQL

result = ActiveRecord::Base.connection.execute(query)
```

## References

- [ActiveRecord::ConnectionAdapters::DatabaseStatements](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/DatabaseStatements.html#method-i-execute){:target="_blank"}
