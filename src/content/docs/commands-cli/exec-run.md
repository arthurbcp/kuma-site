---
title: exec run
description: Description of the exec run command (Mr. Smith Framework)
---

Executes a run that does not belong to any module.


```bash
mr exec module [flags]
```

## Flags
- `--run, -r`: The name of the run to be executed.

## Example

```bash
mr exec run --run setup-database 
```

## TUI

To view the Mr. Smith user interface, simply execute `mr exec run` and the runs that do not belong to any module will be listed.

![image](https://github.com/user-attachments/assets/e1daa12e-ca28-40ca-971d-6f6262a39669)