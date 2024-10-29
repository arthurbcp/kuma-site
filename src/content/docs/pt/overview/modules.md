---
title: Módulos
description: Visão geral de Módulos (Kuma Framework)
---

O sistema de módulos do Kuma permite que desenvolvedores criem, compartilhem e reutilizem estruturas de templates de forma modular. Esses módulos são repositórios independentes que contêm [templates](/overflow/templates), [builders](/overflow/builders) e [runs](/overview/runs).

## Estrutura

A estrutura de um módulo no Kuma é a mesma que você já está acostumado. Qualquer repositório do Github com uma pasta `.kuma` na raiz contendo pelo menos uma run, pode se tornar um módulo se você adicionar um arquivo chamado `kuma-config.yaml` na raiz do repositório.

O arquivo `kuma-config.yaml`, deve seguir o seguinte formato:

```yaml
description: Meu módulo # Descrição do módulo
version: 1.0.0 # Versão do módulo
```


## Adicionando um módulo

Para adicionar um módulo do Kuma ao seu projeto, execute o comando `kuma module add -repository myorgazitaion/myrepository`.
Ou se preferir, você pode digitar apenas `kuma module add`, e escolher um dos nossos módulos oficiais.

Ao adicionar um módulo ao seu projeto, o Kuma copiará o repositório do módulo  para dentro da pasta `.kuma`. Para gerenciar os módulos, o Kuma também criará um arquivo chamado `kuma-modules.yaml`, que será editado automaticamente sempre que um módulo for adicionado ou removido do seu projeto.

Confira a documentação completa do comando `kuma module add` [aqui](/commands-cli/module-add).

## Chamando uma run de um módulo

Confira a documentação completa do comando `kuma exec module` [aqui](/commands-cli/exec-module)

## Removendo um módulo

Confira a documentação completa do comando `kuma module rm` [aqui](/commands-cli/exec-module)