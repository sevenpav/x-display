const { writeFileSync, readFileSync } = require('fs')

const { getDirectoriesBasenames } = require('./utils.js')

const updateDep = require('./updateDep.js')
const dirs = require('./dirs')

const layoutNames = getDirectoriesBasenames(`${dirs.layouts}`)
const pageNames = getDirectoriesBasenames(`${dirs.pages}`)
const componentNames = getDirectoriesBasenames(`${dirs.components}`)

const depsPath = `${dirs.src}/globalDeps.json`

const globalDeps = JSON.parse(readFileSync(depsPath))

globalDeps.layouts = {}
globalDeps.pages = {}
globalDeps.components = {}

writeFileSync(depsPath, JSON.stringify(globalDeps))

layoutNames.forEach(name => {
  updateDep(name, 'layout')
})

pageNames.forEach(name => {
  updateDep(name, 'page')
})

componentNames.forEach(name => {
  updateDep(name, 'component')
})

console.log('Dependencies successfully updated')
