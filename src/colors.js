const chroma = require('chroma-js')
const htmlColors = require('html-colors')

const { toEnum } = require('./utils')

let colors = Object.entries(htmlColors.all())
colors = colors.reduce((acc, [k, v]) => {
  acc[k] = { name: k, unit: 'hex', value: v }
  return acc
}, {})

const Colors = toEnum('Color', colors)

const colorUnits = {
  hex: 'hex',
  hsl: 'hsl',
  rgb: 'rgb',
  rgba: 'rgba'
}

const ColorUnits = toEnum('ColorUnit', colorUnits)

const toColorUnit = (unit, value) => {
  const toHex = v => ({
    value: String(chroma(v).hex()),
    unit: colorUnits.hex
  })

  const toHsl = v => ({
    value: String(chroma(v).hsl()),
    unit: colorUnits.hsl
  })

  const toRgb = v => ({
    value: String(chroma(v).rgb()),
    unit: colorUnits.rgb
  })

  const toRgba = v => ({
    value: String(chroma(v).rgba()),
    unit: colorUnits.rgba
  })

  switch (unit) {
    case colorUnits.hex: {
      return toHex(value)
    }
    case colorUnits.hsl: {
      return toHsl(value)
    }
    case colorUnits.rgb: {
      return toRgb(value)
    }
    case colorUnits.rgba: {
      return toRgba(value)
    }
    default: {
      return toHex(value)
    }
  }
}

const ColorFields = `
color(color: Color!, unit: ColorUnit): ColorToken
colors(unit: ColorUnit): [ColorToken]
`

const ColorResolvers = {
  color: (o, { color, unit }) => {
    if (unit) {
      let { value } = colors[color]
      return { ...colors[color], ...toColorUnit(unit, value) }
    } else {
      return colors[color]
    }
  },
  colors: (o, { unit }) => {
    if (unit) {
      return Object.values(colors).map(({ value, ...rest }) => {
        return { ...rest, ...toColorUnit(unit, value) }
      })
    } else {
      return Object.values(colors)
    }
  }
}

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

module.exports = {
  ColorFields,
  ColorResolvers,
  ColorUnits,
  Colors,
  backgroundColor,
  color
}
