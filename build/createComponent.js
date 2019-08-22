const { mkdirSync, writeFileSync, readFileSync } = require('fs')
const { getDirectoriesBasenames } = require('./utils.js')
const dirs = require('./dirs')

const componentName = process.argv[2]
const existingComponents = getDirectoriesBasenames(`${dirs.components}`)

if (existingComponents.includes(componentName)) {
  throw new Error(`Component with the name ${componentName} already exists`)
}

const componentPath = `${dirs.components}/${componentName}`

mkdirSync(componentPath)

mkdirSync(`${componentPath}/img`)

writeFileSync(
  `${componentPath}/${componentName}.pug`,
  `mixin ${componentName}(mixes)
  include ./_imports/import

  .${componentName}(class=(mixes) && \`\${mixes}__${componentName}\`)

`
)

writeFileSync(
  `${componentPath}/${componentName}.scss`,
  `.${componentName} {
  
}

// Media queries

@include less-xl {

}

@include less-lg {
  
}

@include less-md {
  
}

@include less-sm {
  
}

// Mixes
 
`
)

writeFileSync(
  `${componentPath}/${componentName}.js`,
  `import './${componentName}.scss'
import './_imports/import'
  
`
)

mkdirSync(`${componentPath}/_imports`)

for (let ext of ['js', 'pug']) {
  writeFileSync(`${componentPath}/_imports/import.${ext}`, '')
}

writeFileSync(`${componentPath}/deps.json`, '[]')

const depsPath = `${dirs.src}/globalDeps.json`

const dependencies = JSON.parse(readFileSync(depsPath))

dependencies.components[componentName] = []

writeFileSync(depsPath, JSON.stringify(dependencies))

console.log(`Component ${componentName} successfully created`)
