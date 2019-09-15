const { ApolloServer, gql } = require('apollo-server')

const { ColorFields, ColorResolvers, ColorUnits, Colors } = require('./colors')
const {
  Spacing,
  SpacingFields,
  SpacingResolvers,
  SpacingUnits
} = require('./spacing')

const { FontSizeFields, FontSizeResolvers, FontSizes } = require('./fontSizes')

const typeDefs = gql`
  ${ColorUnits}
  ${Colors}
  ${FontSizes}
  ${SpacingUnits}
  ${Spacing}

  interface Token {
    "Token's name, often used as an enumeration argument"
    name: String!
    "Gives the value context to be interpreted, e.g., 'percent', 'px' or 'hex'."
    unit: String
    "Raw value, like '100', '16' or 'FFFFF'."
    value: String!
  }

  type ColorToken implements Token {
    name: String!
    unit: String
    value: String!
  }

  type FontSizeToken implements Token {
    name: String!
    unit: String
    value: String!
  }

  type SpaceToken implements Token {
    name: String!
    unit: String
    value: String!
  }

  type Component {
    ${ColorFields}
    ${FontSizeFields}
    ${SpacingFields}
  }

  type Query {
    ${ColorFields}
    ${FontSizeFields}
    ${SpacingFields}
    component: Component
  }
`

const resolvers = {
  Query: {
    component: () => ({}),
    ...ColorResolvers,
    ...FontSizeResolvers,
    ...SpacingResolvers
  },
  Component: {
    ...ColorResolvers,
    ...FontSizeResolvers,
    ...SpacingResolvers
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
