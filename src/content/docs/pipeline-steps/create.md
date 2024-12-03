---
title: Create Step
description: Overview of Create Step (Mr. Smith Framework)
---

Generates new files or directories from templates based on a predefined structure.

**Properties**:
- **from**: Path to the [builder](/overview/builders) where the template is located. 

**Example**:
```yaml
- create:
    from: "builders/projectStructure.yaml"
```
