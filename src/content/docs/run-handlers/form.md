---
title: Form Handler
description: Visão geral de Form Handler (Kuma Framework)
---


É usado para exibir formulários interativos no terminal.

**Propriedades**:

- **title**: Define o título do formulário. Esse título é exibido no topo do formulário quando o usuário interage com ele no terminal.


- **description**: Uma breve descrição que informa o propósito do formulário. Ela ajuda o usuário a entender o que deve ser preenchido.


- **fields**: Lista de campos de entrada que serão exibidos no formulário. O `fields` pode conter diferentes tipos de campos.

## Tipos de Campos

---

### Input
Um campo de entrada de texto onde o usuário pode digitar informações.

- **label**: O rótulo exibido próximo ao campo de texto, informando ao usuário o que deve ser digitado.
- **placeholder**: Um valor exibido dentro do campo como exemplo ou sugestão, até que o usuário digite algo.
- **out**: O nome da variável onde o valor digitado pelo usuário será armazenado.

**Exemplo**:
```yaml
- input:
    label: "Nome do Serviço"
    placeholder: "Digite o nome do serviço"
    out: "serviceName"
```

---


  ### Text
  Um campo no formato **Text Area** onde o usuário pode fornecer uma resposta mais longa.

  - **label**: O rótulo que descreve o campo de texto.
  - **description**: Uma descrição adicional para orientar o usuário.
  - **placeholder**: Um valor exemplo ou sugestão exibido no campo até que o usuário insira o texto.
  - **out**: O nome da variável que armazenará o texto inserido pelo usuário.

  **Exemplo**:
  ```yaml
  - text:
      label: "Descrição do Projeto"
      placeholder: "Digite uma breve descrição"
      out: "projectDescription"
  ```

---

  ### Select
  Um campo que permite ao usuário selecionar uma opção de uma lista.

  - **label**: O rótulo que descreve o campo de seleção.
  - **description**: Uma breve descrição que explica o que o campo representa.
  - **out**: O nome da variável que armazenará o valor selecionado pelo usuário.
  - **options**: Lista de opções que o usuário pode escolher. Cada opção tem uma `label` (exibido para o usuário) e um `value` (armazenado na variável).

  **Exemplo**:
  ```yaml
  - select:
      label: "Escolha o tipo de banco de dados"
      description: "Selecione o banco de dados que o serviço usará"
      out: "dbType"
      options:
        - label: "PostgreSQL"
          value: "postgres"
        - label: "MongoDB"
          value: "mongo"
  ```

---

  ### MultiSelect
  Um campo que permite ao usuário selecionar várias opções de uma lista.

  - **label**: O rótulo que descreve o campo de múltipla seleção.
  - **description**: Uma breve descrição que ajuda o usuário a entender o propósito do campo.
  - **out**: O nome da variável onde as opções selecionadas serão armazenadas.
  - **options**: Lista de opções disponíveis para seleção múltipla.
  - **limit**: Número máximo de opções que o usuário pode selecionar.

  **Exemplo**:
  ```yaml
  - multiselect:
      label: "Selecione as tecnologias que você quer incluir"
      out: "techStack"
      options:
        - label: "Docker"
          value: "docker"
        - label: "Kubernetes"
          value: "k8s"
      limit: 2
  ```

---

  ### Confirm
  Um campo que exibe uma pergunta de confirmação, onde o usuário pode responder com "Sim" ou "Não".

  - **label**: O rótulo que descreve o campo de confirmação.
  - **description**: Uma breve descrição que explica o que o usuário deve confirmar.
  - **affirmative**: O texto que representa a resposta afirmativa.
  - **negative**: O texto que representa a resposta negativa.
  - **out**: O nome da variável que armazenará a resposta (`true` ou `false`).

  **Exemplo**:
  ```yaml
  - confirm:
      label: "Deseja gerar a estrutura básica?"
      description: "Confirmação para criar a estrutura inicial"
      affirmative: "Sim"
      negative: "Não"
      out: "createBasicStructure"
  ```