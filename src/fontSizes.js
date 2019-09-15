const { toEnum } = require('./utils')

let fontSizes = {
  xs2: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xl2: 34,
  xl3: 48,
  xl4: 60,
  xl5: 96
}

fontSizes = Object.entries(fontSizes)
fontSizes = fontSizes.reduce((acc, [name, value]) => {
  acc[name] = { name, unit: 'px', value }
  return acc
}, {})

const FontSizes = toEnum('FontSize', fontSizes)

const FontSizeFields = `
fontSize(size: FontSize!): FontSizeToken
fontSizes: [FontSizeToken]
`

const FontSizeResolvers = {
  fontSize: (o, { size, unit }) => {
    if (unit) {
      let { value } = fontSizes[size]
      return { ...fontSizes[size] }
    } else {
      return fontSizes[size]
    }
  },
  fontSizes: (o, { unit }) => {
    if (unit) {
      return Object.values(fontSizes).map(({ value, ...rest }) => {
        return { ...rest, value }
      })
    } else {
      return Object.values(fontSizes)
    }
  }
}

/**
 * @example
 * ${fontSize}
 *
 * query Style($fontSize: FontSizes = xl4) {
 *   ...FontSize
 * }
 */
const fontSize = `fragment FontSize on Query {
  fontSize: fontSize(size: $fontSize) {
    name
    unit
    value
  }
}`

module.exports = {
  FontSizeFields,
  FontSizeResolvers,
  FontSizes,
  fontSize,
  fontSizes
}
