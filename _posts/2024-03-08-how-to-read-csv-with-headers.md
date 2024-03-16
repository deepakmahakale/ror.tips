---
layout: single
title: How to read CSV with headers?
description: &description >
  This article explains how to read a CSV file with headers in Ruby.
excerpt: *description
date: 2024-03-08
categories:
  - Ruby
tags:
  - CSV
header:
  og_image: /assets/images/opengraph/2024-03-08-how-to-read-csv-with-headers.png
---
<style>
  table {
    font-size: inherit;
  }
  thead {
    background-color: inherit;
  }
  th, td {
    width: 1%;
  }
</style>

Ruby provides a way to read a CSV file.
We can specify options to let Ruby know if the file has headers or not.

## How to read a CSV file with headers

| name  | age |
| ----- | --- |
| Alice | 30  |
| Bob   | 25  |

Passing `headers: true` option will treat the first row as headers.
We can now access the values using the header names.

```ruby
require 'csv'
CSV.foreach("path/to/file.csv", headers: true) do |row|
  p row
  p row['name']
  p row['age']
end
# => #<CSV::Row "name":"Alice" "age":"30">
# => "Alice"
# => "30"

# => #<CSV::Row "name":"Bob" "age":"25">
# => "Bob"
# => "25"
```

We can also use various `header_converters` to convert the headers to a different format.

### Convert headers to downcase

Passing `downcase` to `header_converters` will convert the headers to lowercase.

| Name  | Age |
| ----- | --- |
| Alice | 30  |
| Bob   | 25  |

```ruby
require 'csv'
CSV.foreach("path/to/file.csv", headers: true, header_converters: :downcase) do |row|
  p row
  p row['name']
  p row['age']
end
# => #<CSV::Row "name":"Alice" "age":"30">
# => "Alice"
# => "30"
# ...
```

### Convert headers to symbol

Passing `symbol` to `header_converters` will convert the headers to symbols.

| First Name | Age |
| ---------- | --- |
| Alice      | 30  |
| Bob        | 25  |

**Note:** This tokenizes the header names and converts them to symbols. `"First Name"` becomes `:first_name`.
{: .notice--info}

```ruby
require 'csv'
CSV.foreach("path/to/file.csv", headers: true, header_converters: :symbol) do |row|
  p row
  p row[:first_name]
  p row[:age]
end
# => #<CSV::Row first_name:"Alice" age:"30">
# => "Alice"
# => "30"
# ...
```

## References

- [https://ruby-doc.org/stdlib-2.6.1/libdoc/csv/rdoc/CSV.html](https://ruby-doc.org/stdlib-2.6.1/libdoc/csv/rdoc/CSV.html)
