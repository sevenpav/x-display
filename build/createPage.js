const { mkdirSync, writeFileSync, readFileSync } = require('fs')
const { getDirectoriesBasenames } = require('./utils.js')
const dirs = require('./dirs')

const pageName = process.argv[2]
const existingPages = getDirectoriesBasenames(`${dirs.pages}`)

if (existingPages.includes(pageName)) {
  throw new Error(`Page with the name ${pageName} already exists`)
}

const pagePath = `${dirs.pages}/${pageName}`

mkdirSync(pagePath)

mkdirSync(`${pagePath}/_imports`)

for (let ext of ['js', 'pug']) {
  writeFileSync(`${pagePath}/_imports/import.${ext}`, '')
}

writeFileSync(
  `${pagePath}/${pageName}.scss`,
  `#${pageName}-pg {

}

// Mixes

`
)

writeFileSync(
  `${pagePath}/${pageName}.pug`,
  `extends ~@/views/layouts/main/main

block title
  title

block content

  include ./_imports/import

  - const data = require('./data.json')


  #${pageName}-pg
`
)

writeFileSync(
  `${pagePath}/data.json`,
  `{
    
}`
)

writeFileSync(
  `${pagePath}/${pageName}.js`,
  `import '../../layouts/main/main'
import './_imports/import'
import './${pageName}.scss' 
`
)

writeFileSync(`${pagePath}/deps.json`, '[]')

const depsPath = `${dirs.src}/globalDeps.json`

const dependencies = JSON.parse(readFileSync(depsPath))

dependencies.pages[pageName] = []

writeFileSync(depsPath, JSON.stringify(dependencies))

console.log(`Page ${pageName} successfully created`)
