const { resolve } = require('path')
const { config } = require('dotenv')

const pathToConfig = '../.env'
config({ path: resolve(__dirname, pathToConfig) })

process.env.AZURE_DNS = process.env.AZURE_DNS_OPTIONAL || (process.env.AZURE_DNS +'/'+ process.env.AZURE_ORGANIZATION)

if(!process.env.AZURE_DNS) {
  throw new Error(`'AZURE_DNS' environment variable is required.`)
}

if(!process.env.AZURE_TOKEN) {
  throw new Error(`'AZURE_TOKEN' environment variable is required.`)
}

if(!process.env.AZURE_ORGANIZATION) {
  throw new Error(`'AZURE_ORGANIZATION' environment variable is required.`)
}

if(!process.env.AZURE_PROJECT) {
  throw new Error(`'AZURE_PROJECT' environment variable is required.`)
}