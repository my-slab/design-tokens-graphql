import { ApolloServer, gql } from 'apollo-server'
import { EOL } from 'os'
import { camelizeKeys } from 'humps'

import _tokens from '../tokens.json'
import { ColorResolvers } from './color/resolvers'

type Color = {
	$type: 'color'
	$value: string
}

type Dimension = {
	$type: 'dimension'
	$value: string
}

type Tokens = {
	[key: string]: Color | Dimension
}

type Pairs = { [key: string]: string }

function defineEnum(name: string, values: string[]) {
	return `enum ${name} { 
	${values.join(EOL + '\t')}
}`
}

const ColorFields = `
color(name: ColorName!, unit: ColorUnit): Color
colors(unit: ColorUnit): [Color]
`

const ColorUnits = `enum ColorUnit {
    hex
    rgb
    rgba
    hsl
}`

const Schema = `
"""
Design decision associated with a name, at minimum a name/value pair.
"""
interface Token {
	"""
	Token's name, often used as an enumeration argument.
	"""
	name: String!
	"""
	Token's value like '#FFFFF' or '14px'.
	"""
	value: String!
}

type Color implements Token {
	"""
	Token's name, often used as an enumeration argument.
	"""
	name: String!
	"""
	Represents a 24bit RGB or 24+8bit RGBA color in the sRGB color space.
	"""
	value: String!
}

type Dimension implements Token {
	"""
	Token's name, often used as an enumeration argument.
	"""
	name: String!
	"""
	Represents an amount of distance in a single dimension in the UI, such as a position, width, height, radius, or thickness.
	"""
	value: String!
}
`

/**
 * @name
 * defineTypes
 *
 * @example
 * defineTypes({
 *   black: { $type: 'color', $value: '#fff' },
 *   white: { $type: 'color', $value: '#000' },
 *   medium: { $type: 'dimension', $value: '16px' },
 * })
 */
export function defineTypes(tokens: Tokens) {
	const tokenTypes = {
		color: 'color',
		dimension: 'dimension',
	}

	let colorTokens: Pairs = {}
	let dimensionTokens: Pairs = {}

	for (let t in tokens) {
		let token = tokens[t]

		if (token.$type === tokenTypes.color) colorTokens[t] = token.$value
		if (token.$type === tokenTypes.dimension) dimensionTokens[t] = token.$value
	}

	colorTokens = camelizeKeys(colorTokens) as Pairs
	// dimensionTokens = camelizeKeys(dimensionTokens) as Pairs

	return gql`
		${Schema}
		${defineEnum('ColorName', Object.keys(colorTokens))}
		${ColorUnits}

		type Query {
			${ColorFields}
		}
	`
}

/**
 * @name
 * defineResolvers
 *
 * @example
 * defineResolvers({
 *   black: { $type: 'color', $value: '#fff' },
 *   white: { $type: 'color', $value: '#000' },
 *   medium: { $type: 'dimension', $value: '16px' },
 * }, { color, colors })
 */
function defineResolvers(tokens: Tokens) {
	const tokenTypes = {
		color: 'color',
		dimension: 'dimension',
	}

	let colorTokens: Pairs = {}
	let dimensionTokens: Pairs = {}

	for (let t in tokens) {
		let token = tokens[t]
		if (token.$type === tokenTypes.color) colorTokens[t] = token.$value
		if (token.$type === tokenTypes.dimension) dimensionTokens[t] = token.$value
	}

	colorTokens = camelizeKeys(colorTokens) as Pairs
	dimensionTokens = camelizeKeys(dimensionTokens) as Pairs
	return { ...ColorResolvers(colorTokens) }
}

function defineServer(tokens: Tokens) {
	let typeDefs = defineTypes(tokens)
	let resolvers = defineResolvers(tokens)

	return {
		typeDefs,
		resolvers: {
			Query: {
				...resolvers,
			},
		},
	}
}

const server = new ApolloServer(defineServer(_tokens as Tokens))

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})
