---
layout: single
title: How to install ActiveStorage in a rails application.
description: &description >
  This article explains how to install ActiveStorage in a Rails application and how to use it to upload files.
excerpt: *description
date: 2024-08-12
categories:
  - Rails
tags:
  - ActiveStorage
header:
  og_image: /assets/images/opengraph/2024-08-12-how-to-install-activestorage-in-a-rails-application.png
---

## Installation

Add or uncomment the following line in your `Gemfile`:

```ruby
gem "image_processing", ">= 1.2"
```

Now based on the cloud storage service you want to use, add the respective gem:

```ruby
gem "aws-sdk-s3", require: false # For Amazon S3
gem "azure-storage-blob", "~> 2.0", require: false # For Microsoft Azure Storage Service
gem "google-cloud-storage", "~> 1.11", require: false # For Google Cloud Storage
```

Run the following command to install ActiveStorage.

```bash
bin/rails active_storage:install
bin/rails db:migrate
```

This command will create the necessary migrations to store the attachments.

If you use UUIDs for primary key you will need to ensure that the primary key is set to `:uuid` in the migration file.
You can do this by adding the following line to the config file:
`Rails.application.config.generators { |g| g.orm :active_record, primary_key_type: :uuid }`
{: .notice--danger}

Add Active Storage services in `config/storage.yml`:

```yaml
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>

test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>

amazon:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
  bucket: <%= Rails.application.credentials.dig(:aws, :bucket) %>
  region: us-east-1
```

## Configure the services in environment specific files

**Development Environment:**

```ruby
# config/environments/development.rb
config.active_storage.service = :local
```

**Test Environment:**

```ruby
# config/environments/test.rb
config.active_storage.service = :test
```

**Production Environment:**

```ruby
# config/environments/production.rb
config.active_storage.service = :amazon
```

## Usage

### `has_one_attached`

Rails provides a generator to create a model with an attachment:

```bash
bin/rails generate model User avatar:attachment
```

The above command will add the following content in `app/models/user.rb`:

```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
```

### `has_many_attached`

Rails provides a generator to create a model with an attachment:

```bash
bin/rails generate model Post images:attachments
```

The above command will add the following content in `app/models/post.rb`:

```ruby
class Post < ApplicationRecord
  has_many_attached :images
end
```

### Attaching a file / image to the model

Make use of `attach` to attach a file/image to the model.

```ruby
# Attaching a file/image
user.avatar.attach(
  io: File.open("/path/to/file.jpg"),
  filename: "file.jpg",
  content_type: "image/jpg"
)
post.images.attach(
  io: File.open("/path/to/file.jpg"),
  filename: "file.jpg",
  content_type: "image/jpg"
)
```

In order to check if the attachment is present, you can use the following method:

```ruby
user.avatar.attached?
post.images.attached?
```

### Removing the attachments

```ruby
# Remove the attachment
user.avatar.purge

# Use ActiveJob to remove the attachment in the background
user.avatar.purge_later
```

## References

- [Rails Guides: Active Storage Overview](https://guides.rubyonrails.org/active_storage_overview.html){:target="_blank"}
