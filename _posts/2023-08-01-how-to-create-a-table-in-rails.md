---
layout: single
title: How to create a table in rails?
description: &description >
  This article explains how to create a table in rails including fields, references, polymorphic associations, index, and uniq index.
excerpt: *description
date: 2023-08-01
categories:
  - Rails
tags:
  - Database
  - Migration
header:
  og_image: /assets/images/opengraph/2023-08-01-how-to-create-a-table-in-rails.png
---

## Table

Create an articles table

```bash
$ bin/rails generate migration CreateArticles
```

Generates the following migration:

```ruby
# db/migrate/20230803041631_create_articles.rb
class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|

      t.timestamps
    end
  end
end
```

## Table with fields

Create an articles table with title and content fields

```bash
$ bin/rails generate migration CreateArticles title content:text
```

Generates the following migration:

```ruby
# db/migrate/20230803041631_create_articles.rb
class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
```

## Table with references

Create an articles table with references

```bash
$ bin/rails generate migration CreateArticles title content:text user:references
```

Generates the following migration:

```ruby
# db/migrate/20230803041631_create_articles.rb
class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
```

## Table with polymorphic associations

Create an articles table with polymorphic associations

```bash
bin/rails generate migration CreateArticles title content:text resource:references{polymorphic}
```

Generates the following migration:

```ruby
# db/migrate/20230803041631_create_articles.rb
class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.references :resource, polymorphic: true, null: false

      t.timestamps
    end
  end
end
```

## Table with index

Create an articles table with index

```bash
bin/rails generate migration CreateArticles title content:text slug:index
```

Generates the following migration:

```ruby
# db/migrate/20230803041631_create_articles.rb
class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.string :slug

      t.timestamps
    end
    add_index :articles, :slug
  end
end
```

## Table with uniq index


Create an articles table with uniq index

```bash
bin/rails generate migration CreateArticles title content:text slug:uniq
```

Generates the following migration:

```ruby
# db/migrate/20230803041631_create_articles.rb
class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.string :slug

      t.timestamps
    end
    add_index :articles, :slug, unique: true
  end
end
```

## References

- [https://guides.rubyonrails.org/active_record_migrations.html](https://guides.rubyonrails.org/active_record_migrations.html)

## Note

All the commands have been tested with rails 7.1 and the result may differ with prior versions
