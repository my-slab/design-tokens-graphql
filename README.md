<h1>Design Tokens GraphQL</h1>

Design Tokens GraphQL uses [_GraphQL_](https://graphql.org/learn/) as a query language for your design tokens.

By managing design tokens using GraphQL we can describe what's possible in a design system by using types. Component tokens can be constructed from defined primitive tokens as well as providing clear and helpful documentation.

```graphql
query PrimaryButton {
  ...Primary

  padding: spacing(unit: px, space: md) {
    unit
    value
  }
}
```

```json
{
  "data": {
    "backgroundColor": {
      "value": "000000",
      "unit": "hex"
    },
    "color": {
      "value": "FFFFFF",
      "unit": "hex"
    },
    "padding": {
      "value": "16",
      "unit": "px"
    }
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

<h3>Fields</h3>

Design Tokens GraphQL implements the [Theme UI](https://theme-ui.com/theme-spec/) specification when defining the possible entry points into the GraphQL API on the [Query type](https://graphql.org/learn/execution/#root-fields-resolvers).

This means, our Query type provides fields such as

- `colors`
- `fonts`
- `fontSizes`
- `sizes`
- `spacing`

See the full list of fields [here]().

We can query for more than one token of the same field by using [_aliases_](https://graphql.org/learn/queries/#aliases), a GraphQL feature that allows us to rename the result of a field to anything, e.g.,

```graphql
{
  marginBottom: spacing {
    value
    unit
  }
  marginTop: spacing {
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

In this example, color handles transformations for the units <code>rgba</code> and <code>hex</code>.

<h3>Fragments</h3>

We can compose common queries by breaking them into reusable units called [_fragments_](https://graphql.org/learn/queries/#fragments). An often repeated set of fields, padding top and padding bottom, can be represented as a fragment named PaddingY.

```graphql
fragment PaddingY on Query {
  paddingTop: spacing(space: $paddingY) {
    value
    unit
  }
  paddingBottom: spacing(space: $paddingY) {
    value
    unit
  }
}
```

It can now be included with an existing query to provide padding top and padding bottom fields.

```graphql
query Button($paddingY: md) {
  ...PaddingY

  fontSize: fontSizes(fontSize: sm) {
    unit
    value
  }
}
```

A list of common fragments provided is [here]().

<h3>Transforms</h3>
🚧
