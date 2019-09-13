<h1 style="text-align: center;">Design Tokens GraphQL</h1>

Design Tokens GraphQL uses [_GraphQL_](https://graphql.org/learn/) as a query language for your design tokens.

By managing design tokens using GraphQL we can describe what's possible in a design system by using types. Component tokens can be constructed from defined primitive tokens as well as providing clear and helpful documentation.

```graphql
query Buttons {
  buttonPrimary: component {
    ...Button
    backgroundColor: color(color: navy, unit: rgb) {
      unit
      value
      name
    }

    color: color(color: whitesmoke, unit: rgb) {
      unit
      value
      name
    }
  }

  buttonSecondary: component {
    ...Button
    backgroundColor: color(color: whitesmoke) {
      unit
      value
      name
    }

    color: color(color: navy) {
      unit
      value
      name
    }
  }
}

fragment Button on Component {
  padding: spacing(space: sm) {
    unit
    value
  }
}
```

Returns

```json
{
  "data": {
    "buttonPrimary": {
      "padding": {
        "unit": "px",
        "value": "8"
      },
      "backgroundColor": {
        "unit": "rgb",
        "value": "0,0,128",
        "name": "navy"
      },
      "color": {
        "unit": "rgb",
        "value": "245,245,245",
        "name": "whitesmoke"
      }
    },
    "buttonSecondary": {
      "padding": {
        "unit": "px",
        "value": "8"
      },
      "backgroundColor": {
        "unit": "hex",
        "value": "#F5F5F5",
        "name": "whitesmoke"
      },
      "color": {
        "unit": "hex",
        "value": "#000080",
        "name": "navy"
      }
    }
  }
}
```

<h2>How it works</h2>

At its simplest, GraphQL is about asking for specific [_fields_](https://graphql.org/learn/schema/#object-types-and-fields) on objects. In our case, every field is of type <code>Token</code>. A <code>Token</code> contains two subfields, <code>value</code> and <code>unit</code>.

```graphql
type Token {
  name: String!
  unit: String
  value: String!
}
```

`value` denotes a raw value as a string like, `"100"`, `"16"` or `"FFFFFF"`. `unit` gives that value meaning providing it with context to be intepreted, e.g. `"percent"`, `"px"` or `"hex"` (`unit` is optional, as not all tokens have a unit, like `"auto"`). `name` is the name of the token, often used as an enumeration argument when performing token lookups.

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

We can transform the data returned to us by passing [_arguments_](https://graphql.org/learn/queries/#arguments) to a field.

```graphql
{
  backgroundColor: colors(color: chartreuse) {
    value
    unit
  }
  color: colors(color: honeydew) {
    value
    unit
  }
}
```

Passing an Enumeration type, <code>color</code>, ensures we implement a finite set of colors available in our design system.

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

Fields can accept a `unit` argument. This provides a finite list of token specific transforms allowing us to change the value and unit returned on a field-by-field basis.

Let's transform color's default `hex` value, to `hsl`.

```graphql
{
  color: color(color: fuchsia, unit: hsl) {
    name
    value
    unit
  }
}
```

```json
{
  "data": {
    "color": {
      "name": "fuchsia",
      "value": "300,1,0.5,1",
      "unit": "hsl"
    }
  }
}
```
