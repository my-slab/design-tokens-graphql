const { ApolloServer, gql } = require('apollo-server')

const { ColorFields, ColorResolvers, Colors } = require('./colors')

const typeDefs = gql`
  ${Colors}

  type Token {
    "Token's name, often used as an enumeration argument"
    name: String!
    "Gives the value context to be interpreted, e.g., 'percent', 'px' or 'hex'."
    unit: String
    "Raw value, like '100', '16' or 'FFFFF'."
    value: String!
  }

  type Query {
    ${ColorFields}
  }
`

const resolvers = {
  Query: {
    ...ColorResolvers
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
