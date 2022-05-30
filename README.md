# Library Versioning | Azure Devops

Template repository that helps azure applications libraries versioning.

It was created to have a history of the variable value changes.

# Instructions

The variable file contains the following entries:

```yaml
id: // (required) variable group identifier that you can get by looking at the URL on Azure Devops
name: // (required) name of the variable group
description: // (optional) description of the variable group
variables: // start of the variables list entry
- name: // name of the variable
  value: // value of the variable. Optional if it is a secret value
  isSecret: // set it to true if it is a secret value
```

To add a new variable, just add it to the respective application yaml file.

If it is a new application variable group, you have to create a new folder.

If a variable is a secret, do not set a value and define it as 'isSecret: true' and change it manually at the azure interface. We cannot leave such values as a plain text. This way, the variable value is not updated and keeps the same.

# Updating the pipeline

This repository contains a [script](script.js) that updates the azure library automatically if you prefer.

The script expects two arguments:
- Application name: same value as the folder name.
- File name: the respective file name(without the extension) inside of the application folder

To run the script, you will need Node.JS and an Azure DevOps personal access token with a permission to manage Variable Groups. Check this [page](https://docs.microsoft.com/pt-br/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page) for instructions on how to generate it.

- You have to create a token with the permission **Variable Groups (Read, create & manage)**

- Change the name of the [.env.example](.env.example) file to **.env**

- After the creation of the token, set it to the variable (AZURE_TOKEN) inside the new created .env file.

Install the dependencies a single time after cloning the repository
```
npm install
```

After all of this, run the script as stated below:
```
npm run update application_folder_name file_name
```

Example:
```
npm run update AfiliationApi staging
```

# Browser script
The script below help us generate the yaml file directly from the browser console. You need to enter the variables page and put the zoom all the way down to show us all variables at the same time, then you run the code in console. After that you can copy the output and create the respective lib yaml file.
```
let urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams.entries());
let id = params.variableGroupId
let name = document.querySelector('input.bolt-textfield-input').value
let description = document.querySelector('textarea.bolt-textfield-input').value
let str = `id: ${id}\n`
str += `name: ${name}\n`

if (description) {
    str += `description: ${description}\n`
}

str += `variables:`

var index = 0
document.querySelectorAll('.ms-List-cell .flat-view-text-preserve, .ms-List-cell .flat-view-text-input-read-only').forEach(elem => {
    if(index % 2 == 0) {
        str += `
- name: ${elem.innerText}`
    } else {
        str += `
${elem.className==='flat-view-text-preserve' ? `  value: ${elem.innerText}` : '  isSecret: true' }`        
    }
    index++;
})
console.log(str)
```