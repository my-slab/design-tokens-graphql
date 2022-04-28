import chroma from 'chroma-js'

const units = {
	hex: 'hex',
	hsl: 'hsl',
	rgb: 'rgb',
	rgba: 'rgba',
} as const

type Units = keyof typeof units

export function toColorUnit(unit: Units, value: string) {
	let transformedValue = chroma(value)[unit]()
	if (Array.isArray(transformedValue)) return `${unit}(${transformedValue.join(',')})`
	return value
}
