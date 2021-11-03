# Library Versioning | Azure Devops

Template repository that helps azure applications libraries versioning.

It was created to have a history of the variable value changes.

# Instructions

The variable file contains the following entries:

```yaml
id: // (required) variable group identifier that you can get by looking at the URL on Azure Devops
name: // (required) name of the variable group
description: // (optional) description of the variable group
preffix: // (optional) value that will be appended at the beggining of every variable
variables: // start of the variables list entry
- name: // name of the variable
  value: // value of the variable. Optional if it is a secret value
  isSecret: // set it to true if it is a secret value
  disablePreffix: //  if you want to disable the preffix for this variable set it to true
```

To add a new variable, just add it to the respective application yaml file.

If it is a new application variable group, you have to create a new folder and add a new entry to the [applications.yaml](applications.yaml) file.

If a variable is a secret, do not set a value and define it as 'isSecret: true' and change it manually at the azure interface. We cannot leave such values as a plain text. This way, the variable value is not updated and keeps the same.

You can set a preffix for all variables. Just set a `preffix: NAME` to the root of the variable file and it will append to the beggining of all variables that does not contains the value `disablePreffix: true`.

# Updating the pipeline

This repository contains a [script](script.js) that updates the azure library automatically if you prefer.

The script expects two arguments:
- Application name: same value as mapped in the [applications.yaml] file.
- File name: the respective file name(without the extension) inside of the application folder

To run the script, you will need Node.JS and an Azure DevOps personal access token with a permission to manage Variable Groups. Check this [page](https://docs.microsoft.com/pt-br/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page) for instructions on how to generate it.

- Change the name of the [.env.example](.env.example) file to **.env**

- After the creation of the token, set it to the variable (AZURE_TOKEN) inside the new created .env file.

After all of this, run the script as stated below:
```
node script.js application_name file_name
```

Example:
```
node script.js test_api staging
```