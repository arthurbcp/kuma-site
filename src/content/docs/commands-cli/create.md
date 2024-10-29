---
title: create
description: Description of the create command (Kuma Framework)
---

Generates new files or directories from templates based on a predefined structure.

```bash
kuma create [flags]
```

## Flags

- `--variables, -v`: The path or URL of the variables file that will be used to generate the file. **Required**
- `--project, -p`: The path of the directory that will be created.
- `--from, -f`: The path of the YAML file ([builder](/overview/builders)) that will be used to generate the file. **Required**

## Example

```bash
kuma create --project "./my-project" --from "./my-project-structure.yaml"
```