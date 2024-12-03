---
title: About Mr. Smith
description: Getting Started Guide for the Mr. Smith Framework
---

Mr. Smith is a powerful framework designed to generate scaffolds for any programming language, based on [Go templates](https://pkg.go.dev/text/template). It simplifies the setup process for new projects by automating the creation of directories, files, and base code, ensuring consistency and saving valuable development time. Additionally, Mr. Smith features a customizable TUI, providing an intuitive and efficient experience for both scaffold creators and users, making the process accessible and smooth for developers of all levels.

## Features

- Customize the directory and file structure of your project using [Go templates](https://pkg.go.dev/text/template).
- Integration with GitHub to download predefined community templates or for personal use via private repositories.
- Ability to create custom CLI/TUI command workflows through a YAML file using pipelines.
- Use of dynamic variables applicable to templates. Variables can be extracted from a local YAML or JSON file or fetched from a public URL. They can also be obtained from user input during the execution of a [pipeline](/overview/pipelines).
