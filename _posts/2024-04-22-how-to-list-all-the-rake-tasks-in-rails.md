---
layout: single
title: How to list all the rake tasks?
description: &description >
  This article explains how to list all the rake tasks in an application, documented as well as undocuented.
excerpt: *description
date: 2024-04-22
categories:
  - Rails
tags:
  - Rake
header:
  og_image: /assets/images/opengraph/2024-04-22-how-to-list-all-the-rake-tasks.png
---

We often need to check the available rake tasks in a rails application.
Rake provides a built-in method to list all the available rake tasks.

## Documented Rake Tasks

The following command lists only the documented rake tasks in the application.

```sh
$ rake -T [PATTERN]

$ rake -T
rake action_mailbox:ingress:exim        # Relay an inbound email from Exim to Action Mailbox (URL and INGRESS_PASSWORD required)
rake action_mailbox:ingress:postfix     # Relay an inbound email from Postfix to Action Mailbox (URL and INGRESS_PASSWORD required)
.
.
.

$ rake -T action_text
rake action_text:install             # Copy over the migration, stylesheet, and JavaScript files
rake action_text:install:migrations  # Copy migrations from action_text to application
```

We can also use the `-D` or `--describe` option to list the tasks with their descriptions.

```sh
$ rake -T [PATTERN]
$ rake -D action_text
rake action_text:install
    Copy over the migration, stylesheet, and JavaScript files

rake action_text:install:migrations
    Copy migrations from action_text to application
```


## Unocumented Rake Tasks

In order to print the undocumented rake tasks, you can use the following command:

```sh
$ rake -AT [PATTERN]

$ rake -T test:prepare # Notice that the task is not listed

$ rake -AT test:prepare
rake db:test:prepare  #
rake test:prepare     #
```

## Available Options As of Rails 7.1

```sh
$ rake --help
rake [-f rakefile] {options} targets...

Options are ...
        --backtrace=[OUT]            Enable full backtrace.  OUT can be stderr (default) or stdout.
        --comments                   Show commented tasks only
        --job-stats [LEVEL]          Display job statistics. LEVEL=history displays a complete job list
        --rules                      Trace the rules resolution.
        --suppress-backtrace PATTERN Suppress backtrace lines matching regexp PATTERN. Ignored if --trace is on.
    -A, --all                        Show all tasks, even uncommented ones (in combination with -T or -D)
    -B, --build-all                  Build all prerequisites, including those which are up-to-date.
    -C, --directory [DIRECTORY]      Change to DIRECTORY before doing anything.
    -D, --describe [PATTERN]         Describe the tasks (matching optional PATTERN), then exit.
    -e, --execute CODE               Execute some Ruby code and exit.
    -E, --execute-continue CODE      Execute some Ruby code, then continue with normal task processing.
    -f, --rakefile [FILENAME]        Use FILENAME as the rakefile to search for.
    -G, --no-system, --nosystem      Use standard project Rakefile search paths, ignore system wide rakefiles.
    -g, --system                     Using system wide (global) rakefiles (usually '~/.rake/*.rake').
    -I, --libdir LIBDIR              Include LIBDIR in the search path for required modules.
    -j, --jobs [NUMBER]              Specifies the maximum number of tasks to execute in parallel. (default is number of CPU cores + 4)
    -m, --multitask                  Treat all tasks as multitasks.
    -n, --dry-run                    Do a dry run without executing actions.
    -N, --no-search, --nosearch      Do not search parent directories for the Rakefile.
    -P, --prereqs                    Display the tasks and dependencies, then exit.
    -p, --execute-print CODE         Execute some Ruby code, print the result, then exit.
    -q, --quiet                      Do not log messages to standard output.
    -r, --require MODULE             Require MODULE before executing rakefile.
    -R, --rakelibdir RAKELIBDIR,     Auto-import any .rake files in RAKELIBDIR. (default is 'rakelib')
        --rakelib
    -s, --silent                     Like --quiet, but also suppresses the 'in directory' announcement.
    -t, --trace=[OUT]                Turn on invoke/execute tracing, enable full backtrace. OUT can be stderr (default) or stdout.
    -T, --tasks [PATTERN]            Display the tasks (matching optional PATTERN) with descriptions, then exit. -AT combination displays all the tasks, including those without descriptions.
    -v, --verbose                    Log message to standard output.
    -V, --version                    Display the program version.
    -W, --where [PATTERN]            Describe the tasks (matching optional PATTERN), then exit.
    -X, --no-deprecation-warnings    Disable the deprecation warnings.
    -h, -H, --help                   Display this help message.
```
