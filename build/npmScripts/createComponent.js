const { mkdirSync, writeFileSync } = require('fs')
const { getDirectoriesBasenames } = require('../utils')
const dirs = require('../dirs')
const updateImports = require('./updateImports')

const name = process.argv[2]
const existingComponents = getDirectoriesBasenames(`${dirs.components}`)

if (existingComponents.includes(name)) {
  const msg = `Component with the name ${name} already exists`

  throw new Error(msg)
}

const componentPath = `${dirs.components}/${name}`

mkdirSync(componentPath)

mkdirSync(`${componentPath}/img`)

writeFileSync(
  `${componentPath}/${name}.pug`,
  `mixin ${name}(mixes)

  .${name}(class=(mixes) && \`\${mixes}__${name}\`)

`
)

writeFileSync(
  `${componentPath}/${name}.scss`,
  `.${name} {
  
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


// Animation
 
`
)

writeFileSync(`${componentPath}/${name}.js`, '')

updateImports()

console.log(`Component ${name} successfully created`)
