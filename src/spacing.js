const { toEnum } = require('./utils')

let spacing = {
  xs2: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 64,
  xl2: 128
}

spacing = Object.entries(spacing)
spacing = spacing.reduce((acc, [k, v]) => {
  acc[k] = { name: k, unit: 'px', value: v }
  return acc
}, {})

const Spacing = toEnum('Spacing', spacing)

const SpacingFields = `
spacing(space: Spacing!, unit: SpacingUnit): SpaceToken
spacings(unit: SpacingUnit): [SpaceToken]
`

const spacingUnits = {
  percent: 'percent',
  px: 'px',
  rem: 'rem'
}

const SpacingUnits = toEnum('SpacingUnit', spacingUnits)

const toSpacingUnit = (unit, value) => {
  const toPx = v => ({
    value: `${String(v)}px`,
    unit: spacingUnits.px
  })

  const toPercent = v => ({
    value: `${String(v)}%`,
    unit: spacingUnits.percent
  })

  const toRem = v => ({
    value: `${v / 16}rem`,
    unit: spacingUnits.rem
  })

  switch (unit) {
    case spacingUnits.px: {
      return toPx(value)
    }
    case spacingUnits.percent: {
      return toPercent(value)
    }
    case spacingUnits.rem: {
      return toRem(value)
    }
    default: {
      return toPx(value)
    }
  }
}

const SpacingResolvers = {
  spacing: (o, { space, unit }) => {
    if (unit) {
      let { value } = spacing[space]
      return { ...spacing[space], ...toSpacingUnit(unit, value) }
    } else {
      return spacing[space]
    }
  },
  spacings: o => {
    const unit = null
    if (unit) {
      return Object.values(spacing).map(({ value, ...rest }) => {
        return { ...rest, ...toSpacingUnit(unit, value) }
      })
    } else {
      return Object.values(spacing)
    }
  }
}

/**
 * @example
 * ${paddingX}
 *
 * query Button($paddingX: Spacing = lg) {
 *   ...PaddingX
 * }
 */
const paddingX = `fragment PaddingX on Query {
  paddingLeft: spacing(space: $paddingX) {
    value
    unit
  }

  paddingRight: spacing(space: $paddingX) {
    value
    unit
  }
}`

/**
 * @example
 * ${paddingY}
 *
 * query Button($paddingY: Spacing = lg) {
 *   ...PaddingY
 * }
 */
const paddingY = ` fragment PaddingY on Query {
  paddingTop: spacing(space: $paddingY) {
    value
    unit
  }

  paddingBottom: spacing(space: $paddingY) {
    value
    unit
  }
}`

/**
 * @example
 * ${padding}
 *
 * query Button($padding: Spacing = lg) {
 *   ...Padding
 * }
 */
const padding = `fragment Padding on Query {
  padding: spacing(space: $padding) {
    value
    unit
  }
}`

/**
 * @example
 * ${marginX}
 *
 * query Button($marginX: Spacing = lg) {
 *   ...MarginX
 * }
 */
const marginX = `fragment MarginX on Query {
  marginLeft: spacing(space: $marginX) {
    value
    unit
  }

  marginRight: spacing(space: $marginX) {
    value
    unit
  }
}`

/**
 * @example
 * ${marginY}
 *
 * query Button($marginY: Spacing = lg) {
 *   ...MarginY
 * }
 */
const marginY = `fragment MarginY on Query {
  marginTop: spacing(space: $marginY) {
    value
    unit
  }

  marginBottom: spacing(space: $marginY) {
    value
    unit
  }
}`

/**
 * @example
 * ${margin}
 *
 * query Button($margin: Spacing = lg) {
 *   ...Margin
 * }
 */
const margin = `fragment Margin on Query {
  margin: spacing(space: $margin) {
    value
    unit
  }
}`

/**
 * @example
 * ${marginTop}
 *
 * query Button($marginTop: Spacing = lg) {
 *   ...MarginTop
 * }
 */
const marginTop = `fragment MarginTop on Query {
  marginTop: spacing(space: $marginTop) {
    value
    unit
  }
}`

/**
 * @example
 * ${marginBottom}
 *
 * query Button($marginBottom: Spacing = lg) {
 *   ...MarginBottom
 * }
 */
const marginBottom = `fragment MarginBottom on Query {
  marginBottom: spacing(space: $marginBottom) {
    value
    unit
  }
}`

/**
 * @example
 * ${marginLeft}
 *
 * query Button($marginLeft: Spacing = lg) {
 *   ...MarginLeft
 * }
 */
const marginLeft = `fragment MarginLeft on Query {
  marginLeft: spacing(space: $marginLeft) {
    value
    unit
  }
}`

/**
 * @example
 * ${marginRight}
 *
 * query Button($marginRight: Spacing = lg) {
 *   ...MarginRight
 * }
 */
const marginRight = `fragment MarginRight on Query {
  marginRight: spacing(space: $marginRight) {
    value
    unit
  }
}`

module.exports = {
  Spacing,
  SpacingFields,
  SpacingResolvers,
  SpacingUnits,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  padding,
  paddingX,
  paddingY,
  spacing
}
