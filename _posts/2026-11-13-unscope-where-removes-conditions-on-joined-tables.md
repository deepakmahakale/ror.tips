---
layout: single
title: unscope(where:) removes conditions on joined tables too
description: &description >
  This article explains why unscope(where: :column) also removes conditions on joined tables,
  how to qualify the column, and the Rails 9.0 deprecation.
excerpt: *description
date: 2026-11-13
categories:
  - Rails
tags:
  - Active Record
  - Deprecation
header:
  og_image: /assets/images/opengraph/2026-11-13-unscope-where-removes-conditions-on-joined-tables.png
---

`unscope(where: :column)` removes the condition on **every** table that has a column with that name,
not only the model's own table.

```ruby
Post.joins(:comments)
    .where(body: "post", comments: { body: "test" })
    .unscope(where: :body)
# removes both posts.body and comments.body
```

```sql
SELECT "posts".* FROM "posts"
INNER JOIN "comments" ON "comments"."post_id" = "posts"."id"
```

The same happens with `eager_load` and `includes` + `references`.

This is easy to miss in scopes like:

```ruby
class Post < ApplicationRecord
  scope :with_deleted, -> { unscope(where: :deleted_at) }
end

Post.joins(:comments).where(comments: { deleted_at: nil }).with_deleted
# also drops comments.deleted_at IS NULL
```

## Qualify the column
Pass the table name to unscope only that table:

```ruby
# bad
.unscope(where: :body)

# good - only comments.body
.unscope(where: { comments: :body })
.unscope(where: "comments.body")

# good - only posts.body
.unscope(where: { posts: :body })
```

Both forms work since Rails 6.1.

For the scope above:

```ruby
scope :with_deleted, -> { unscope(where: { posts: :deleted_at }) }
```

Use `table_name` if the scope lives in a concern:

```ruby
scope :with_deleted, -> { unscope(where: { table_name => :deleted_at }) }
```

## Rails 8.2 and 9.0
Rails 8.2 (currently `main`) deprecates the current behavior:

```
DEPRECATION WARNING: Unscoping an unqualified column with `unscope(where: ...)` also removes
conditions on other tables (comments.body). This behavior is deprecated and in Rails 9.0
`unscope(where: ...)` will only remove conditions on the `posts` table for unqualified columns.
To remove conditions on other tables, qualify the column with the table name
(e.g. `unscope(where: "comments.body")`).
```

In Rails 9.0, `unscope(where: :body)` will only remove `posts.body`.
If your code relies on it removing conditions on joined tables, qualify those columns now.

#### NOTE:
Rails 8.2 also fixes this for `merge` ([rails/rails#59709](https://github.com/rails/rails/pull/59709){:target="_blank"}):
`Post.joins(:comments).merge(Post.with_deleted)` will only unscope `posts.deleted_at`.
On Rails 8.1 and older, `merge` has the same problem, so qualify the column there too.

## References
- [rails/rails#59767 - Deprecate unscope(where: :column) removing conditions on other tables](https://github.com/rails/rails/pull/59767){:target="_blank"}
- [Rails API - ActiveRecord::QueryMethods#unscope](https://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-unscope){:target="_blank"}
