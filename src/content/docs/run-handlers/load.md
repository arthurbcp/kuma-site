---
title: Load Handler
description: Load Handler Overview (Kuma Framework)
---

Loads data from a local or remote file (JSON or YAML or text file) and stores it in a variable.

For text files that are not JSON or YAML, Kuma will create a `content` variable for the file content.

**Properties**:
- **from**: Path to the file to be loaded. Can be a local or remote file.
- **out**: The name of the variable that will store the loaded data.

**Examples**:

**local file**:
```yaml
- load:
    from: "./unreleased.json"
    out: "unreleased"
```

**remote file**:
```yaml
- load:
    from: "https://petstore.swagger.io/v2/swagger.json"
    out: "swaggerData"
```

**reading data from a text file**:
```yaml
- load:
    from: "./README.md"
    out: "readme"

- log: "Readme: {{.data.readme.content}}"
```