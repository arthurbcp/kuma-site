---
title: run
description: Description of the run command (Mr. Smith Framework)
---

Executes a pipeline.

```bash
mr run [flags]
```

## Flags
- `--pipeline, -r`: The name of the pipeline to be executed.
- `--module, -m`: The name of the module to be executed.
- `--vars, -v`: Array of variables to be passed to the templates.
  The `--vars` flag replaces the form fields. If a variable is provided with the same name as the `out` of a form field, the field in question will not be displayed.
  
## Example

```bash
mr run --module crud-maker --pipeline setup-database  --vars controller:"users",method:"get",middlewares:"auth|validate",createTable:true
```