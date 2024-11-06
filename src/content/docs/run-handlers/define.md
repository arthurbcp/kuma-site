---
title: Define Handler
description: Overview of Define Handler (Mr. Smith Framework)
---

Defines variables that can be used in later stages of the [run](/overview/runs), [builders](/overview/builders), or [templates](/overview/templates).

**Properties**:
- **variable**: The name of the variable to be defined.
- **value**: The value assigned to the variable.

**Example**:
```yaml
- define:
      variable: "dbConnection"
      value: "{{.data.dbType}}"
```