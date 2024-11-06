---
title: exec module
description: Description of the exec module command (Mr. Smith Framework)
---

Executes a run that belongs to a module.


```bash
mr exec module [flags]
```

## Flags
- `--run, -r`: The name of the run that will be executed.
- `--module, -m`: The name of the module that will be executed.

## Example

```bash
mr exec module --module crud-maker --run setup-database 
```

## TUI

To view the Mr. Smith user interface, simply execute `mr exec module` and all modules will be listed.
If you want to see only the runs of a specific module, execute `mr exec module --module <module-name>`.

![image](https://github.com/user-attachments/assets/ad260094-f30a-4cbb-9cc6-49b9af377613)