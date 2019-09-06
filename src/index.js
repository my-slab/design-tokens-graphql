const { ApolloServer, gql } = require('apollo-server')

const { Colors, colors } = require('./colors')

const typeDefs = gql`
  ${Colors}

  type Token {
    unit: String!
    value: String!
  }

  type Query {
    colors(color: Color): Token
  }
`

const resolvers = {
  Query: {
    colors: (o, { color }) => (color ? colors[color] : colors)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
