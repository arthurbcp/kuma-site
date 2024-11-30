---
title: Form Handler
description: Visão geral de Form Handler (Mr. Smith Framework)
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
- **out**: O nome da variável onde o valor digitado pelo usuário será armazenado. **Required**

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
  - **out**: O nome da variável que armazenará o texto inserido pelo usuário. **Required**

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
  - **out**: O nome da variável que armazenará o valor selecionado pelo usuário. **Required**
  - **options**: Lista de opções que o usuário pode escolher. Cada opção tem uma `label` (exibido para o usuário) e um `value` (armazenado na variável). 
  - **options-from**:  Caminho para um arquivo (local ou remoto) com uma estrura JSON ou YAML contendo um objeto no formato abaixo para montar as options de forma dinâmica
    ```json
    {
      "options": [
        {
          "label": "option 1",
          "value": "value 1"
        }
      ]
    }
    ```

  **Exemplo com options**:
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

  **Exemplo com options-from**:
  ```yaml
  - select:
      label: "Escolha o tipo de banco de dados"
      description: "Selecione o banco de dados que o serviço usará"
      out: "dbType"
      options-from: db-types.json
  ```
  ```json
  //db-types.json
    {
      "options": [
        {
           "label": "PostgreSQL",
           "value": "postgres"
        },
        {
          "label": "MongoDB",
          "value": "mongo"
        }
      ]
    }
  ```

---

  ### MultiSelect
  Um campo que permite ao usuário selecionar várias opções de uma lista.

  - **label**: O rótulo que descreve o campo de múltipla seleção.
  - **description**: Uma breve descrição que ajuda o usuário a entender o propósito do campo.
  - **out**: O nome da variável onde as opções selecionadas serão armazenadas. **Required**
  - **options**: Lista de opções disponíveis para seleção múltipla. 
  - **limit**: Número máximo de opções que o usuário pode selecionar.
  - **options-from**:  Caminho para um arquivo (local ou remoto) com uma  estrura JSON ou YAML contendo um objeto no formato abaixo para montar as options de forma dinâmica.
    ```json
    {
      "options": [
        {
          "label": "option 1",
          "value": "value 1"
        }
      ]
    }
    ```

  **Exemplo com options**:
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

  **Exemplo com options-from**:
  ```yaml
   - multiselect:
      label: "Selecione as tecnologias que você quer incluir"
      out: "techStack"
      options-from: devops-tools.json
      limit: 2
  ```
  ```json
  //devops-tools.json
    {
      "options": [
        {
           "label": "Docker",
           "value": "docker"
        },
        {
          "label": "Kubernetes",
          "value": "ks8"
        }
      ]
    }
  ```

---

  ### Confirm
  Um campo que exibe uma pergunta de confirmação, onde o usuário pode responder com "Sim" ou "Não".

  - **label**: O rótulo que descreve o campo de confirmação.
  - **description**: Uma breve descrição que explica o que o usuário deve confirmar.
  - **affirmative**: O texto que representa a resposta afirmativa. **Required**
  - **negative**: O texto que representa a resposta negativa. **Required**
  - **out**: O nome da variável que armazenará a resposta no formato booleano.

  **Exemplo**:
  ```yaml
  - confirm:
      label: "Deseja gerar a estrutura básica?"
      description: "Confirmação para criar a estrutura inicial"
      affirmative: "Sim"
      negative: "Não"
      out: "createBasicStructure"
  ```