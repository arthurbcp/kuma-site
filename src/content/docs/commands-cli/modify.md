---
title: modify
description: Description of the modify command (Kuma Framework)
---

Modifies existing files based on templates, allowing for content insertion, replacement, or removal.


```bash
kuma modify [flags]
```

## Flags

- `--variables, -v`: The path or URL of the variables file to be used to generate the file. **Required**
- `--file, -f`: The path of the file to be modified. **Required**
- `--template, -t`: The path of the template file to be used to modify the file. **Required**
- `--mark, -m`: The marker in the file that defines where the change will be made.
- `--action, -r`: The action to be performed, which can be:
  - **replace**: Replaces the marker with the content of the template (Leave empty if you want the entire content to be replaced).
  - **insert-before**: Inserts the content before the marker.
  - **insert-after**: Inserts the content after the marker.
  - **replace-between**: Replaces the content between two markers separated by `,`.


## Example

  ```bash
  kuma modify --file "./services/service.go" --template "./templates/service.yaml" --mark "#DB_CONNECTION" --action "replace"
  ```  