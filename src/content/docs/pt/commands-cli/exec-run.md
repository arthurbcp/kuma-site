---
title: exec run
description: Descrição do comando exec run (Kuma Framework)
---

Executa uma run que não pertence a nenhum um módulo.


```bash
kuma exec module [flags]
```

## Flags
- `--run, -r`: O nome da run que será executada.

## Exemplo

```bash
kuma exec run --run setup-database 
```

## TUI

Para visualizar a interface de usuário do Kuma, execute apenas `kuma exec run` e as runs que não pertencem a nenhum módulo serão listadas.

![image](https://github.com/user-attachments/assets/e1daa12e-ca28-40ca-971d-6f6262a39669)