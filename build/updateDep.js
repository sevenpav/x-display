const { writeFileSync, readFileSync, appendFileSync } = require('fs')
const dirs = require('./dirs')
const resetDep = require('./resetDep.js')

const updateDep = (name, entity) => {
  resetDep(name, entity)

  let entityPath
  let property
  let normalizeJsPath = '../../../components'

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
      normalizeJsPath = '../..'
      break
  }

  const targetPath = `${entityPath}/${name}`

  const targetDeps = JSON.parse(readFileSync(`${targetPath}/deps.json`))

  const globalDepsPath = `${dirs.src}/globalDeps.json`

  const globalDeps = JSON.parse(readFileSync(globalDepsPath))

  const globalDepsSubTarget = globalDeps[property][name]

  const addDep = dep => {
    globalDepsSubTarget.push(dep)

    writeFileSync(globalDepsPath, JSON.stringify(globalDeps))
  }

  const rewriteFiles = dep => {
    const map = {
      js: `import '${normalizeJsPath}/${dep}/${dep}'\n`,
      pug: `include ~@/views/components/${dep}/${dep}\n`
    }

    for (let key in map) {
      const data = map[key]
      appendFileSync(`${targetPath}/_imports/import.${key}`, data)
    }
  }

  const isContains = dep => globalDepsSubTarget.some(el => el === dep)

  targetDeps.forEach(dep => {
    if (!isContains(dep)) {
      rewriteFiles(dep)

      addDep(dep)
    }
  })
}

module.exports = updateDep
