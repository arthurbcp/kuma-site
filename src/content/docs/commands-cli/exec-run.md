---
title: exec run
description: Description of the exec run command (Kuma Framework)
---

Executes a run that does not belong to any module.


```bash
kuma exec module [flags]
```

## Flags
- `--run, -r`: The name of the run to be executed.

## Example

```bash
kuma exec run --run setup-database 
```

## TUI

To view the Kuma user interface, simply execute `kuma exec run` and the runs that do not belong to any module will be listed.

![image](https://github.com/user-attachments/assets/e1daa12e-ca28-40ca-971d-6f6262a39669)