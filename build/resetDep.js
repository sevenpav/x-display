const { readdirSync, writeFileSync, readFileSync } = require('fs')
const dirs = require('./dirs')

module.exports = (name, entity) => {
  let entityPath
  let property

  switch (entity) {
    case 'layout':
      entityPath = dirs.layouts
      property = 'layouts'
      break
    case 'page':
      entityPath = dirs.pages
      property = 'pages'
      break
    case 'component':
      entityPath = dirs.components
      property = 'components'
      break
  }

  const path = `${entityPath}/${name}/_imports`

  readdirSync(path).forEach(file => {
    writeFileSync(`${path}/${file}`, '')
  })

  const depsPath = `${dirs.src}/globalDeps.json`
  const deps = JSON.parse(readFileSync(depsPath))

  deps[property][name] = []

  writeFileSync(depsPath, JSON.stringify(deps))
}
