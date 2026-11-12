---
layout: single
title: "How to execute raw SQL in Rails"
description: &description >
  Run raw SQL in Rails with connection.execute, select_all, select_value and find_by_sql, pass parameters safely, and run SQL in a migration.
excerpt: *description
date: 2024-08-21
last_modified_at: 2026-11-12
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

`execute` returns whatever the database driver returns (`PG::Result` on PostgreSQL, `Mysql2::Result` on MySQL, an array on SQLite), so the result looks different on each database. For reading data, the `select_*` methods below are usually nicer.

## Complex queries with a heredoc

While it is totally acceptable to use the string version of SQL query,
a heredoc keeps longer queries readable:

```ruby
query = <<~SQL
  SELECT *
  FROM articles
  INNER JOIN users
          ON users.id = articles.user_id
  ORDER BY articles.created_at DESC
SQL

result = ActiveRecord::Base.connection.execute(query)
```

## Read results the same way on every database

```ruby
conn = ActiveRecord::Base.connection

result = conn.select_all("SELECT id, email FROM users")  # ActiveRecord::Result
result.to_a       # => [{"id" => 1, "email" => "a@example.com"}, ...]
result.columns    # => ["id", "email"]
result.rows       # => [[1, "a@example.com"], ...]

conn.select_one("SELECT * FROM users ORDER BY id LIMIT 1")  # => one hash
conn.select_value("SELECT COUNT(*) FROM users")             # => 42
conn.select_values("SELECT email FROM users")               # => ["a@example.com", ...]
conn.select_rows("SELECT id, email FROM users")             # => [[1, "a@example.com"], ...]
```

## Get model objects back: `find_by_sql`

```ruby
users = User.find_by_sql(["SELECT * FROM users WHERE created_at > ?", 1.week.ago])
users.first.email
```

## Pass values safely

Never interpolate user input into SQL. That's SQL injection:

```ruby
# Don't
ActiveRecord::Base.connection.execute("SELECT * FROM users WHERE email = '#{params[:email]}'")
```

Use placeholders, which Rails escapes:

```ruby
User.find_by_sql(["SELECT * FROM users WHERE email = ?", params[:email]])

sql = ActiveRecord::Base.sanitize_sql_array(["SELECT * FROM users WHERE email = ?", params[:email]])
ActiveRecord::Base.connection.select_all(sql)
```

## Raw SQL in a migration

Inside a migration, `execute` is available directly. Raw SQL isn't reversible, so use `up` and `down`:

```ruby
class AddSearchIndexToArticles < ActiveRecord::Migration[7.1]
  def up
    execute "CREATE INDEX index_articles_on_lower_title ON articles (LOWER(title))"
  end

  def down
    execute "DROP INDEX index_articles_on_lower_title"
  end
end
```

## Rails 7.2+

`ActiveRecord::Base.connection` still works, but Rails 7.2 added `with_connection`, which returns the connection to the pool when the block ends:

```ruby
ActiveRecord::Base.with_connection do |conn|
  conn.select_value("SELECT COUNT(*) FROM users")
end
```

## References

- [ActiveRecord::ConnectionAdapters::DatabaseStatements](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/DatabaseStatements.html){:target="_blank"}
- [Rails Guides: Finding by SQL](https://guides.rubyonrails.org/active_record_querying.html#finding-by-sql){:target="_blank"}
