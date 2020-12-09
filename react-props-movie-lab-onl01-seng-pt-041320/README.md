# React Props Movie Lab

## Objectives

- Practice passing props from parent components to children
- Practice using default props
- Practice jumping into and improving existing code

## Introduction

This is a bare-bones React application used to showcase the nine greatest movies
of all time. Your job is to update it so that it passes props from parent to
children components correctly. In addition, you will implement default props so
that 'bad/missing data' is properly handled - preventing our user interface from
blowing up our visitors' computers

Following is the component tree. When fully rendered, there are **9**
`MovieCards` rendered by `MovieShowcase`:

```text
└── MovieShowcase
    │
    ├── MovieCard
    │   ├── CardFront
    │   └── CardBack
    │
    └── MovieCard
        ├── CardFront
        └── CardBack
```

`MovieShowcase` is the component that will house all of the 'raw' data
associated with the movies we want to display. This data is located in
`src/data.js` and is already being imported.

`MovieCard` components (which showcase a single movie) receive their individual
movie information from `MovieShowcase` as four props: `title`, `IMDBRating`,
`genres`, and `poster`. Following, the props are passed again to either
`CardFront` or `CardBack`.

In our movie data set, we occasionally have missing data. This is where
`defaultProps` come in and really pull our buns out of the fire. We will be
handling all of our `defaultProp`'ing in `MovieCard` before they are passed down
the chain to the front and back components.

## Deliverables

###### `MovieShowcase`

To get started, take a look at `src/data.js` to get a sense of the data you'll
be working with. We can see that the data is stored in an array of objects. At
the end of this file, the data is set up to be exported and in
`src/MovieShowcase.js`, we can see that this data gets imported in at the top:

```js
import movieData from './data.js'
```

The `MovieShowcase` component, then, has access to `movieData`. We want to take this
data and, for every object inside, render a `MovieCard` component, passing the object
data in as props. Don't forget to pass _all 4_ props

**Hint**: In JSX, it is possible to include JavaScript code and calls to
functions. A function called in JSX must be wrapped in curly braces and must
return a single JSX element. That single JSX element, however, can contain other
elements. So, for instance, the component below renders valid JSX:

```js
import React from 'react';

class App extends React.Component {

  generateInnerJSX = () => {
    return (
      <ul>
        <li>Hello</li>
        <li>Goodbye</li>
      </ul>
    )
  }
  render() {
    return (
      <div>
        {this.generateInnerJSX()}
      </div>
    )
  }
}

export default App;
```

There is an important exception to this: it is possible to return multiple JSX
elements in an _array_. So instead of having to wrap the `li` elements above in
a `ul` element, we could write:

```js
import React from 'react';

class App extends React.Component {

  generateInnerJSX = () => {
    return [
      <li>Hello</li>,
      <li>Goodbye</li>
    ]
  }

  render() {
    return (
      <div>
        {this.generateInnerJSX()}
      </div>
    )
  }
}

export default App;
```

More importantly, because we can return arrays, we can use `.map` to map over
data and return an array of elements. The code below will render two `li`
elements just like the previous example, but this time using data from an array:

```js
import React from 'react';

const LIST = ["Hello", "Goodbye"]

class App extends React.Component {

  generateInnerJSX = () => {
    return LIST.map(item => <li>{item}<li>)
  }

  render() {
    return (
      <div>
        {this.generateInnerJSX()}
      </div>
    )
  }
}

export default App;
```
Let's see another example. Suppose you have a component called `List` instead of an `li`.
We can also map through an array of data and return an array of JSX to dynamically create
our `List` components. We can even pass the strings `Hello` and `Goodbye` as props:

```js

class List extends React.Component{
  render(){
    return <li>{this.props.content}</li>
  }
}

const LIST = ["Hello", "Goodbye"]

class App extends React.Component {
  generateInnerJSX = () => {
    return LIST.map(item => <List content={item}/>)
  }

  render() {
    return (
      <div>
        {this.generateInnerJSX()}
      </div>
    )
  }
}
```

The above code is the same as below:

```js
class App extends React.Component {
  render() {
    return (
      <div>
        {[
          <List content={"Hello"} />,
          <List content={"Goodbye"} />
        ]}
      </div>
    )
  }
}

```

We are dynamically generating an _array_ of JSX to render inside our `<div>` tag.

You can do the same with `movieData`: map over the data, passing in values from
each object as props. See the [documentation here][lists-and-keys] for
additional information.

###### `MovieCard`

If everything is set up properly in `MovieShowcase`, running the application
will produce a page with 9 empty squares popping out. These are the nine
`MovieCard` components being rendered in `MovieShowcase` and if you click one and
hold your mouse button down, you'll see the card animate and 'turn over.' 

If we were to place `console.log(this.props)` in the `MovieCard` component at
the beginning of `render()`, we'd see that each `MovieCard` contains different
props. Your task here is to pass props to the two child components of
`MovieCard`, `CardFront` and `CardBack`. 

`CardBack` will display the title, genres and IMDB rating. `CardFront` will only
be used to display the movie poster. `CardFront` should receive a `poster`
prop, while `CardBack` should receive `title`, `genre`, and `IMDBRating` props.

Thinking about the structure of this application, `CardFront` and `CardBack`
have specific tasks - to display the data they receive as props. `MovieShowcase`
is where this data is imported in. What is the purpose of `MovieCard` then?

In this case, `MovieCard` acts as a sort of container. It does render a `div`
element with a CSS class, but besides that, its primary purpose is to house
the `CardFront` and `CardBack` components.

**Note**: The poster info you received from `movieData` is only a hyphenated
version of the movie title. All the poster image assets you need are imported into
`MovieCard` already, but you must figure out a way get the right poster based
on the props from `MovieShowcase` and pass it down to `CardFront`.

Besides containing `CardFront` and `CardBack`, the `MovieCard` component can
also be used to make sure that the data being passed down to `CardFront` and
`CardBack` is complete. For this, we can use default props. Default props allow
us to set a default value in the event that a prop is not provided. By doing
this in `MovieCard`, we can ensure that the props passed down to `CardFront` and
`CardBack` are consistent.

Write `defaultProps` for the following:

- `title` should default to `"Unknown"`
- `IMDBRating` should default to `null`
- `genres` should receive a value that will work with our `CardBack` component's
  rendering method for genres. The screen should read: `'No Genre(s) Found'`
- `poster` should get the string `"default"`

Review the previous Props readme for an example on default props, and/or take a
look at the [documentation][default props] for additional guidance.

###### `CardFront`

This component should have one prop, which should be used to apply a background
image. This can be done inline via:

```js
style={{backgroundImage: `url(${prop})`}}
```

###### `CardBack`

In this component, you will need to render the `title`, `genres` and
`IMDBRating`. 

For `genres`, join each genre together into string with commas separating each.

For `IMDBRating`, you will need to finish writing the method
`generateRatingElement()`, which should do the following:

- if the `IMDBRating` prop is `null`, return an `<h4>` with the contents `'No Rating Found'`
- otherwise, return `<img src={imgMapper[prop]} alt="" />` (using the correct
  prop)

Just like the posters in `MovieCard`, we've provided image assets and an object, `imgMapper`,
that includes the right images. The values of `imgMapper` can be passed directly in as
the `src` attribute on an `img` element, but you must use the `IMDBRating` prop as the key
to access these values.

#### Once Finished

Check out the application and make sure everything is functioning how you would like!

## Resources

- [React Default Prop Values][default props]

[default props]: https://reactjs.org/docs/react-component.html#defaultprops
[lists-and-keys]: https://reactjs.org/docs/lists-and-keys.html
