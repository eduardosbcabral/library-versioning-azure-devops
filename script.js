require("./utils/env")
const fs = require('fs');
const yaml = require('js-yaml')
const axios = require('axios');

try {
  validateArguments()

  const application_arg = process.argv[2]
  const file_arg = process.argv[3]

  const { id, name, description, preffix, variables } = getApplicationYaml(application_arg, file_arg)

  const obj = buildRequestVariables(preffix, variables)

  updateVariable(id, name, description, obj)

} catch(e) {
  console.error(e)
}

function validateArguments() {
  let application_arg = process.argv[2]
  let file_arg = process.argv[3]

  if(!application_arg) {
    throw new Error('Application argument is required.')
  }

  if(!file_arg) {
    throw new Error('Yaml file argument is required.')
  }
}

function getApplicationYaml(applicationName, file_arg) {

  try {
    const yamlFilePath = './libraries/' + applicationName + '/' + file_arg + '.yaml'
    const libYamlContents = fs.readFileSync(yamlFilePath, 'utf8')
    return yaml.load(libYamlContents)
  } catch(e) {
    console.log(e)
    process.exit()
  }
}

function buildRequestVariables(preffix, variables) {
  let obj = {};
  for(const variable of variables) {
    let name = ''
    if(variable.disablePreffix) {
      name = variable.name
    } else {
      name = preffix ? preffix + variable.name : variable.name
    }

    obj[name] = {
      value: variable.isSecret ? null : variable.value
    }

    if(variable.isSecret) {
      obj[name].isSecret = true
    }
  }

  return obj
}

function updateVariable(id, name, description, variables) {
  const obj = {
    name,
    variables
  }

  if(description) {
    obj['description'] = description
  }

  const tokenBase64 = Buffer.from(`${process.env.AZURE_TOKEN}:`, 'utf8').toString('base64')
  const headers = {
    'Authorization': `Basic ${tokenBase64}`
  }

  const options = {
    headers
  }
  console.log(obj)
  axios.put(`https://${process.env.AZURE_DNS}/${process.env.AZURE_PROJECT}/_apis/distributedtask/variablegroups/${id}?api-version=5.0-preview.1`, obj, options)
    .then(res => {
      if(res.status === 200) {
        console.log('Variables updated!')
      }
    })
}