const htmlColors = require('html-colors')
const { toEnum } = require('./utils')

let colors = Object.entries(htmlColors.all())
colors = colors.reduce((acc, [k, v]) => {
  acc[k] = { name: k, unit: 'hex', value: v.split('#')[1] }
  return acc
}, {})

const Colors = toEnum('Color', colors)

/**
 * @example
 * ${backgroundColor}
 *
 * query BackgroundColor($bg: Color = rebeccapurple) {
 *   ...BackgroundColor
 * }
 */
const backgroundColor = `fragment BackgroundColor on Query {
  backgroundColor: color(color: $bg) {
    name
    unit
    value
  }
}`

/**
 * @example
 * ${color}
 *
 * query Color($color: Color = rebeccapurple) {
 *   ...Color
 * }
 */
const color = `fragment Color on Query {
  color: color(color: $color) {
    name
    unit
    value
  }
}`

const ColorFields = `
color(color: Color): Token
colors: [Token]
`

const ColorResolvers = {
  color: (o, { color }) => colors[color],
  colors: () => Object.values(colors)
}

module.exports = {
  ColorFields,
  ColorResolvers,
  Colors,
  backgroundColor,
  color
}
