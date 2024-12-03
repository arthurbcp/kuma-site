---
title: Form Step
description: Overview of Form Step (Mr. Smith Framework)
---


It is used to display interactive forms in the terminal.

**Properties**:

- **title**: Defines the title of the form. This title is displayed at the top of the form when the user interacts with it in the terminal.


- **description**: A brief description that informs the purpose of the form. It helps the user understand what needs to be filled out.


- **fields**: A list of input fields that will be displayed in the form. The `fields` can contain different types of fields.

## Field Types

---

### Input
An input field where the user can type information.

- **label**: The label displayed next to the text field, informing the user what should be typed.
- **placeholder**: A value displayed inside the field as an example or suggestion until the user types something.
- **out**: The name of the variable where the value typed by the user will be stored. **Required**

**Example**:
```yaml
- input:
    label: "Service Name"
    placeholder: "Type the name of the service"
    out: "serviceName"
```

---


  ### Text
  A field in the format of a **Text Area** where the user can provide a longer response.

  - **label**: The label that describes the text field.
  - **description**: An additional description to guide the user.
  - **placeholder**: An example value or suggestion displayed in the field until the user enters text.
  - **out**: The name of the variable that will store the text entered by the user. **Required**

  **Example**:
  ```yaml
  - text:
      label: "Project Description"
      placeholder: "Type a brief description"
      out: "projectDescription"
  ```

---

  ### Select
  A field that allows the user to select one option from a list.

  - **label**: The label that describes the selection field.
  - **description**: A brief description that explains what the field represents.
  - **out**: The name of the variable that will store the value selected by the user. **Required**
  - **options**: A list of options that the user can choose from. Each option has a `label` (displayed to the user) and a `value` (stored in the variable).
  - **options-from**: Path to a file (local or remote) with a JSON or YAML structure containing an object in the format below to dynamically build the options.
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

  **Example with options**:
  ```yaml
  - select:
      label: "Choose the type of database"
      description: "Select the database that the service will use"
      out: "dbType"
      options:
        - label: "PostgreSQL"
          value: "postgres"
        - label: "MongoDB"
          value: "mongo"
  ```

  **Example with options-from**:
  ```yaml
  - select:
      label: "Choose the type of database"
      description: "Select the database that the service will use"
      out: "dbType"
      options-from: db-type.json
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
  A field that allows the user to select multiple options from a list.

  - **label**: The label that describes the multi-select field.
  - **description**: A brief description that helps the user understand the purpose of the field.
  - **out**: The name of the variable where the selected options will be stored. **Required**
  - **options**: A list of available options for multiple selection. 
  - **limit**: The maximum number of options that the user can select.
  - **options-from**: Path to a file (local or remote) with a JSON or YAML structure containing an object in the format below to dynamically build the options.
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

  **Example with options**:
  ```yaml
  - multiselect:
      label: "Select the technologies you want to include"
      out: "techStack"
      options:
        - label: "Docker"
          value: "docker"
        - label: "Kubernetes"
          value: "k8s"
      limit: 2
  ```

  **Example with options-from**:
  ```yaml
  - multiselect:
      label: "Select the technologies you want to include"
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
  A field that displays a confirmation question, where the user can respond with "Yes" or "No".

  - **label**: The label that describes the confirmation field.
  - **description**: A brief description that explains what the user should confirm.
  - **affirmative**: The text that represents the affirmative answer. **Required**
  - **negative**: The text that represents the negative answer. **Required**
  - **out**: The name of the variable that will store the response in boolean format.

  **Example**:
  ```yaml
  - confirm:
      label: "Do you want to generate the basic structure?"
      description: "Confirmation to create the initial structure"
      affirmative: "Yes"
      negative: "No"
      out: "createBasicStructure"
  ```