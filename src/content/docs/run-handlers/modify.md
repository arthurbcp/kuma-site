---
title: Modify Handler
description: Overview of Modify Handler (Kuma Framework)
---

Alters existing files based on templates, allowing you to insert, replace, or remove content.

**Properties**:
- **file**: The path of the file to be modified.
- **template**: The path of the template used to modify the file.
- **mark**: A marker in the file that defines where the change will be made.
- **action**: The action to be performed, which can be:
  - **replace**: Replaces the marker with the content of the template (Leave empty if you want the entire content to be replaced).
  - **insert-before**: Inserts the content before the marker.
  - **insert-after**: Inserts the content after the marker.
  - **replace-between**: Replaces the content between two markers separated by `,`.

**Examples**:

```yaml
- modify:
    file: "./services/{{.data.serviceName}}/config.yaml"
    template: "./templates/configTemplate.yaml"
    mark: "#CONFIG"
    action: "replace"
```

```yaml
- modify:
    file: "./services/{{.data.serviceName}}/config.yaml"
    template: "./templates/configTemplate.yaml"
    mark: "#CONFIG,#END CONFIG"
    action: "replace-between"
```