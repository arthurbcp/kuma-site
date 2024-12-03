---
title: When Step
description: Overview of When Step (Mr. Smith Framework)
---

Executes a pipeline conditionally.

**Properties**:
- **condition**: The condition that must evaluate to true for the pipeline to execute.
- **pipeline**: The name of the pipeline that will be executed if the condition is met.

**Example**:
```yaml
- when:
      condition: "{{.data.createBasicStructure }}"
      pipeline: "generateBasicStructure"
```