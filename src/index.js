const { ApolloServer, gql } = require('apollo-server')

const { ColorFields, ColorResolvers, ColorUnits, Colors } = require('./colors')
const {
  Spacing,
  SpacingFields,
  SpacingResolvers,
  SpacingUnits
} = require('./spacing')

const typeDefs = gql`
  ${Colors}
  ${ColorUnits}
  ${Spacing}
  ${SpacingUnits}

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

  type SpaceToken implements Token {
    name: String!
    unit: String
    value: String!
  }

  type Component {
    ${ColorFields}
    ${SpacingFields}
  }

  type Query {
    ${ColorFields}
    ${SpacingFields}
    component: Component
  }
`

const resolvers = {
  Query: {
    component: () => ({}),
    ...ColorResolvers,
    ...SpacingResolvers
  },
  Component: {
    ...ColorResolvers,
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
