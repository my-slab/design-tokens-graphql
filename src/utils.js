const { EOL } = require('os')

const toEnum = (name, enums) => `enum ${name} {
  ${Object.keys(enums).join(EOL)}
}`

module.exports = {
  toEnum
}
