export const tokens = `
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
