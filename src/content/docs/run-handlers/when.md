---
title: When Handler
description: Overview of When Handler (Mr. Smith Framework)
---

Executes a run conditionally.

**Properties**:
- **condition**: The condition that must evaluate to true for the run to execute.
- **run**: The name of the run that will be executed if the condition is met.

**Example**:
```yaml
- when:
      condition: "{{ if .data.createBasicStructure }}"
      run: "generateBasicStructure"
```