---
title: exec
description: Descrição do comando exec (Mr. Smith Framework)
---

Executa uma run.


```bash
mr exec [flags]
```

## Flags
- `--run, -r`: O nome da run que será executada.
- `--module, -m`: O nome do módulo que será executado.
- `--vars, -v`: Array de variáveis que serão passadas para os templates.
  A flag `--vars` substitui os campos do formulário. Se uma variável for informada com o mesmo nome do `out` de um campo de formulário, o campo em questão não será exebido.
  
## Exemplo

```bash
mr exec --module crud-maker --run setup-database  --vars controller:"users",method:"get",middlewares:"auth|validate",createTable:true
```