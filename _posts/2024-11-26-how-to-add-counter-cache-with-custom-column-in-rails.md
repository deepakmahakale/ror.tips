---
layout: single
title: How to add counter cache with custom column in Rails?
description: &description >
  This article explains how to add counter cache with a custom column in Rails.
excerpt: *description
date: 2024-11-26
categories:
  - Rails
tags:
  - counter_cache
header:
  og_image: /assets/images/opengraph/2024-11-26-how-to-add-counter-cache-with-custom-column-in-rails.png
---

Counter caches are a handy way to maintain and optimize the performance of counting associated records in Rails.
By using a counter cache, Rails keeps a separate column in the parent table to track the number of associated child records,
updating it automatically whenever child records are created or destroyed.

In this post, we will cover:

- [How to add a counter cache using the default column name](#adding-a-counter-cache-with-the-default-column-name).
- [How to customize the column name for the counter cache](#adding-a-counter-cache-with-a-custom-column-name).

## Adding a counter cache with the default column name
When adding a counter cache,
Rails expects the column to follow the naming convention `#{model_name}_count` in the parent table.

For example,
if a `Post` model has many `Comments`,
Rails expects a `comments_count` column in the `posts` table.

Here's how you can set it up:

1. **Add the counter cache**

    Define the association in the child model and enable the counter cache:

    ```ruby
    class Post < ApplicationRecord
      has_many :comments
    end

    class Comment < ApplicationRecord
      belongs_to :post, counter_cache: true
    end
    ```

2. **Add the `comments_count` column**

    Generate a migration to add the `comments_count` column to the `posts` table:

    ```bash
    rails generate migration AddCommentsCountToPosts comments_count:integer
    ```

    Update the migration file to add default value:

    ```ruby
    class AddCommentsCountToPosts < ActiveRecord::Migration[7.1]
      def change
        add_column :posts, :comments_count, :integer, default: 0
      end
    end
    ```

    Run the migration:

    ```bash
    rails db:migrate
    ```

3. **Initialize existing records**

    If you already have data in your database,
    you'll need to populate the counter cache column for existing records.

    Use the `reset_counters` method:

    ```ruby
    Post.find_each do |post|
      Post.reset_counters(post.id, :comments)
    end
    ```

That's it! Now, Rails will automatically update the `comments_count` column whenever a comment is `created` or `destroyed`.

## Adding a counter cache with a custom column name

If you want to use a different column name for your counter cache (e.g., `custom_comments_count`), you can customize it like this:

1. **Specify the custom column name**

    In the child model, provide the column name in the `counter_cache` option:

    ```ruby
    class Comment < ApplicationRecord
      belongs_to :post, counter_cache: :custom_comments_count
    end
    ```

2. **Add the custom column**

    Generate a migration to add the custom column to the posts table:

    ```bash
    rails generate migration AddCustomCommentsCountToPosts custom_comments_count:integer
    ```

    Update the migration file to add default value:
    ```ruby
    class AddCustomCommentsCountToPosts < ActiveRecord::Migration[7.1]
      def change
        add_column :posts, :custom_comments_count, :integer, default: 0
      end
    end
    ```

    Run the migration:

    ```bash
    rails db:migrate
    ```

3. **Initialize existing records**

    Similar to the default setup, initialize the column for existing records using the `reset_counters` method:
    ```ruby
    Post.find_each do |post|
      Post.reset_counters(post.id, :comments) # Use the association name, not the column name
    end
    ```

4. **Verify the counter cache**

    Now, whenever a `Comment` is `created` or `destroyed`,
    Rails will automatically update the `custom_comments_count` column in the posts table.


## When to use counter caches

Counter caches are particularly useful when you frequently need to display or query counts of associated records.
Instead of calculating these counts on the fly, which can be slow and resource-intensive, Rails maintains the count for you in a separate column, ensuring faster lookups.
