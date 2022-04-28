export const ColorUnits = `enum ColorUnit {
    hex
    rgb
    rgba
    hsl
}`

export const ColorFields = `
color(color: ColorName!, unit: ColorUnit): Color
colors(unit: ColorUnit): [Color]
`

export const ColorNames = `enum ColorName {
    gray100
    gray200
    gray300
}`
