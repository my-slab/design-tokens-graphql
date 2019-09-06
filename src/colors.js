const { EOL } = require('os')
const { hex } = require('./utils')

const colors = {
  orange0: hex('FEF2E0'),
  orange1: hex('FCDEB1'),
  orange2: hex('FAC87F'),
  orange3: hex('F9B24C'),
  orange4: hex('F7A126'),
  orange5: hex('F69202'),
  orange6: hex('F28602'),
  orange7: hex('EC7602'),
  orange8: hex('E66702'),
  orange9: hex('DC4C02'),

  blue0: hex('E3F3FF'),
  blue1: hex('BBE1FF'),
  blue2: hex('8CCFFF'),
  blue3: hex('55BCFF'),
  blue4: hex('1BACFF'),
  blue5: hex('009DFF'),
  blue6: hex('008DFF'),
  blue7: hex('007AFF'),
  blue8: hex('1368EC'),
  blue9: hex('2045CD'),

  pink0: hex('FFE3FE'),
  pink1: hex('FFB8FD'),
  pink2: hex('FF81FD'),
  pink3: hex('F63FF5'),
  pink4: hex('E900E8'),
  pink5: hex('DC00DD'),
  pink6: hex('CB00D8'),
  pink7: hex('B300D3'),
  pink8: hex('9F00CD'),
  pink9: hex('7700C3')
}

const Colors = `enum Color {
  ${Object.keys(colors).join(EOL)}
}`

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
    value
    unit
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
    value
    unit
  }
}`

module.exports = {
  Colors,
  backgroundColor,
  color,
  colors
}
