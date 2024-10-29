---
title: Load Handler
description: Overview of Load Handler (Kuma Framework)
---

Loads data from a local or remote file (JSON or YAML) and stores it in a variable.

**Properties**:
- **from**: Path to the file to be loaded. It can be a local or remote file.
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