<h1>Design Tokens GraphQL</h1>

Design Tokens GraphQL uses [_GraphQL_](https://graphql.org/learn/) as a query language for your design tokens.

By managing design tokens using GraphQL we can describe what's possible in a design system by using types. Component tokens can be constructed from defined primitive tokens and provide clear and helpful documentation.

```graphql
query PrimaryButton {
  ...Primary

  padding: spacing(space: md) {
    unit
    value
  }
}

fragment Primary on Query {
  backgroundColor: colors(color: secondary, unit: hex) {
    unit
    value
  }
  color: colors(color: primary, unit: hsla) {
    unit
    value
  }
}
```

<h2>How it works</h2>

At its simplest, GraphQL is about asking for specific [_fields_](https://graphql.org/learn/schema/#object-types-and-fields) on objects. In our case, every field is of type <code>Token</code>. A <code>Token</code> contains two subfields, <code>value</code> and <code>unit</code>.

```graphql
type Token {
  unit: String
  value: String!
}
```

<code>value</code> denotes a raw value as a string like, <code>"100"</code>, <code>"16"</code> and <code>"FFFFFF"</code>. <code>unit</code> gives that value meaning providing it with context to be intepreted, e.g. <code>"percent"</code>, <code>"px"</code> and <code>"hex"</code> (<code>unit</code> is optional, as not all tokens have a unit, like <code>"auto"</code>).

We can query for more than one token, by using [_aliases_](https://graphql.org/learn/queries/#aliases), a GraphQL feature that allows us to rename the result of a field to anything, e.g.

```graphql
{
  marginBottom: token {
    value
    unit
  }
  marginTop: token {
    value
    unit
  }
}
```

will return

```json
{
  "data": {
    "marginBottom": {
      "value": "8",
      "unit": "px"
    },
    "marginTop": {
      "value": "8",
      "unit": "px"
    }
  }
}
```

<h3>Arguments</h3>

We can transform the data returned to us by passing [_arguments_](https://graphql.org/learn/queries/#arguments) to a field. Passing an Enumeration type, <code>unit</code>, ensures we implement a finite set of transformations.

```graphql
{
  backgroundColor: colors(unit: rgba) {
    value
    unit
  }
  color: colors(unit: hex) {
    value
    unit
  }
}
```

In this example, color handles the units <code>rgba</code> and <code>hex</code>.
