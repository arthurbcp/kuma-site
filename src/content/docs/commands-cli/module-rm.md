---
title: module rm
description: Descrição do comando module rm (Kuma Framework)
---

Remove um módulo do Kuma do seu projeto.

```bash
kuma module rm [flags]
```

## Flags
- `--module, -m`: O nome do módulo que será removido.
- `--rm-git-submodule`: Remove o módulo do git submodule. **Default**: `false`

## Exemplo

```bash
kuma module rm --module hello-world
```