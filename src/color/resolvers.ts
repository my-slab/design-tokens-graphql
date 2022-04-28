import { camelize } from 'humps'
import { toColorUnit } from './transforms'

type Pairs = { [key: string]: string }

const units = {
	hex: 'hex',
	hsl: 'hsl',
	rgb: 'rgb',
	rgba: 'rgba',
} as const

type Units = keyof typeof units

export function ColorResolvers(tokens: Pairs) {
	return {
		color(o: any, { name, unit }: { name: string; unit: Units }) {
			let value = tokens[name]
			if (unit) value = toColorUnit(unit, value)
			return { name, value }
		},
		// colors: (o: any, { unit }: { unit: Units }) => {
		// 	if (unit) {
		// 		return Object.entries(tokens).map(([key, value]) => {
		// 			return { name: key, value: toColorUnit(unit, value) }
		// 		})
		// 	} else {
		// 		return Object.entries(tokens).map(([key, value]) => {
		// 			return { name: key, value }
		// 		})
		// 	}
		// },
	}
}
