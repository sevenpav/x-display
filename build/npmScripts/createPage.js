const { mkdirSync, writeFileSync } = require('fs')
const { getDirectoriesBasenames } = require('../utils')
const dirs = require('../dirs')
const updateImports = require('./updateImports')

const name = process.argv[2]
const existingPages = getDirectoriesBasenames(`${dirs.pages}`)

if (existingPages.includes(name)) {
  const msg = `Page with the name ${name} already exists`

  throw new Error(msg)
}

const pagePath = `${dirs.pages}/${name}`

mkdirSync(pagePath)

writeFileSync(
  `${pagePath}/${name}.scss`,
  `#${name}-pg {

}

// Mixes

`
)

writeFileSync(
  `${pagePath}/${name}.pug`,
  `extends ~@/layout

block title
  title

block content

  - const data = require('./data.js')

  #${name}-pg

`
)

writeFileSync(
  `${pagePath}/data.js`,
  `module.exports = {
    
}`
)

writeFileSync(`${pagePath}/${name}.js`, '')

updateImports()

console.log(`Page ${name} successfully created`)
