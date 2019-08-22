const { lstatSync, readdirSync, existsSync } = require('fs')
const { join, basename } = require('path')

const isFolderExists = source => existsSync(source)

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectoriesBasenames = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)
    .map(dir => basename(dir))

module.exports.isFolderExists = isFolderExists
module.exports.isDirectory = isDirectory
module.exports.getDirectoriesBasenames = getDirectoriesBasenames
