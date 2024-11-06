---
title: exec module
description: Descrição do comando exec module (Mr. Smith Framework)
---

Executa uma run que pertence a um módulo.


```bash
mr exec module [flags]
```

## Flags
- `--run, -r`: O nome da run que será executada.
- `--module, -m`: O nome do módulo que será executado.

## Exemplo

```bash
mr exec module --module crud-maker --run setup-database 
```

## TUI

Para visualizar a interface de usuário do Mr. Smith, execute apenas `mr exec module` e todos os módulos serão listados.
Se você quiser ver apenas as runs de um módulo específico, execute `mr exec module --module <nome-do-modulo>`.

![image](https://github.com/user-attachments/assets/ad260094-f30a-4cbb-9cc6-49b9af377613)