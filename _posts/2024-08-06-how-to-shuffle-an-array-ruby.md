---
layout: single
title: How to shuffle an array in ruby?
description: &description >
  This article explains how to shuffle an array in ruby.
excerpt: *description
date: 2024-03-18
categories:
  - Ruby
tags:
  - Array
  - Shuffle
header:
  og_image: /assets/images/opengraph/2024-08-06-how-to-shuffle-an-array-in-ruby.png

---

## `Array#shuffle` command

The `shuffle` method will shuffle the elements in an array and returns a new array.

```ruby
array = [1, 2, 3, 4, 5]
array.shuffle
# => [3, 4, 2, 5, 1]
array
# => [1, 2, 3, 4, 5]
```

## `Array#shuffle!` command

The `shuffle!` method will shuffle the elements in an array in place.

```ruby
array = [1, 2, 3, 4, 5]
array.shuffle!
# => [3, 4, 2, 5, 1]
array
# => [3, 4, 2, 5, 1]
```

## References

- [Rubydoc - Array#shuffle](https://ruby-doc.org/core-3.0.1/Array.html#method-i-shuffle){:target="_blank"}
