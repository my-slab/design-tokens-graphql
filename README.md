<h1>Design Tokens GraphQL</h1>

Design Tokens GraphQL uses [_GraphQL_](https://graphql.org/learn/) as a query language for your design tokens.

By managing design tokens using GraphQL we can describe what's possible in a design system by using types. Components can be built with what's defined in the design system and provide clear and helpful documentation.

<h2>How it works</h2>

At its simplest, GraphQL is about asking for specific [_fields_](https://graphql.org/learn/schema/#object-types-and-fields) on objects. In our case, every field is a <code>Token</code> type which contains two subfields, <code>value</code> and <code>unit</code>.

```graphql
token {
  value: String!
  unit: String
}
```

<code>value</code> denotes a raw value as a string like, <code>"100"</code>, <code>"16"</code> and <code>"FFFFFF"</code>. <code>unit</code> gives that value meaning providing it with context to be intepreted, e.g. <code>"percent"</code>, <code>"px"</code> and <code>"hex"</code> (<code>unit</code> is optional, as not all tokens have a unit, like <code>"auto"</code>).

We can query for more than one token, by using [_aliases_](https://graphql.org/learn/queries/#aliases), a GraphQL feature that allows us to rename the result of a field to anything, e.g.

```graphql
{
  marginTop: token {
    value
    unit
  }
  marginBottom: token {
    value
    unit
  }
}
```
