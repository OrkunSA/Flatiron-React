# React Using Callbacks to Pass Information Code-Along

## Objectives

- Practice using state, props, and events
- Practice using callbacks to effect change up and down the component tree

## Introduction

In React, **props** are used to pass information _down_ the component tree, from
parents to children. In order to propagate information in the opposite
direction, we can use callback functions, also passed down as props from parent
components to children. However, because these functions are defined _in the
parent_, **they will still be in that context if called from a child component**.

This allows the callback to be _owned_ by a different component than the one
invoking it. Once invoked, the callback can effect change in the component that
_owns it_, instead of the component that _called it_.

For this code-along, we'll explore this concept by creating an interactive "pixel"
drawing app entirely out React components and data.

We'll use three components, forming a parent with two children:

```text
└── Matrix
    ├── ColorSelector
    └── Cell (x625)
```

We would like to implement the following behavior: The `ColorSelector` component
provides the user interface to select a specific color. When a particular `Cell`
is clicked, its background color becomes whatever the current selected color is.
To achieve this behavior, we need some way for `Cell` to know about the
currently selected color and we also need a way for `ColorSelector` to _modify_
the selected color based on user input. To do this, we will have the parent
component, `Matrix`, keep track of the current selected color.

Because passing information between children components is taboo in React, (i.e.
passing information between `ColorSelector` and a `Cell`), we need to make sure
that the following is implemented:

- `ColorSelector` has a way to set some 'selected color' in `Matrix` when a user
  selects a color
- `Cell` has a way to know what the current selected color is when it is clicked

Using callbacks as props, we can do both of these things pretty easily!

## Code-Along

We'll work from the 'top' layer down. The application technically starts with
`src/index.js`, where the `Matrix` component is rendered:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import learnSymbol from './data.js'
import Matrix from './Matrix.js'

ReactDOM.render(<Matrix values={learnSymbol} />, document.getElementById('root'));
```

This code is already provided, but take a moment to note the setup. The
`Matrix` component is the only thing rendered, and is passed a `values` prop. If you
run `npm install && npm start`, you should see this data - it is the symbol from
[Learn.co](https://learn.co), pixelated! However, each "pixel" is actually a
`div`. You can inspect each one in the browser to confirm!

The data used to create these `div`s comes from `src/data.js`, and is stored as
an array of arrays of strings, each representing a hexadecimal color value.
Let's explore how this works before updating it to be interactive.

### `Matrix`

Let's look at the current setup of the `Matrix` component:

```js
import React, { Component } from 'react';
import learnSymbol from './data.js'
import Cell from './Cell.js'
import ColorSelector from './ColorSelector.js'

export default class Matrix extends Component {

  constructor() {
    super()
  }

  genRow = (vals) => (
    vals.map((val, idx) => <Cell key={idx} color={val} />)
  )

  genMatrix = () => (
    this.props.values.map((rowVals, idx) => <div key={idx} className="row">{this.genRow(rowVals)}</div>)
  )

  render() {
    return (
      <div id="app">
        <ColorSelector />
        <div id="matrix">
          {this.genMatrix()}
        </div>
      </div>
    )
  }
}

Matrix.defaultProps = {
  values: learnSymbol
}
```

`Matrix`, as seen above, renders a `div` containing the `ColorSelector`
component and another `div`. Within this nested `div` is a function call to
`this.genMatrix()`. In this function, `this.props.values` is used to return a map
of JSX `div`s.

> **Aside**: Remember that when using arrow functions, you can use parentheses
> instead of curly braces to implicitly return a value.

In the process of returning each of these `div`s, `genRow()` is called, which
returns a collection of `Cell` components. The `Cell` component itself just
renders a `div`, so these two functions working together return a series of
`div`s, each containing _another_ series of `div`s. The actual color value
stored in the data is passed into `Cell` as `color={val}`.

Looking briefly at `Cell`, we can see that this `color` prop is used to set the
initial state of the component, and that state value is then used to modify the
background color of the returned `div`:

```js
import React, { Component } from 'react';

export default class Cell extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color
    }
  }
  
  render() {
    return (
      <div className="cell"
           style={{backgroundColor: this.state.color}}
      >
      </div>
    )
  }
  
}
```

So, to summarize, data is passed into `Matrix` as an array of arrays of strings.
On render, this data is mapped to JSX elements. _(With some CSS help,)_ these
elements form rows of squares on the screen.

Rendered just above the `Cell`s, we also have the `ColorSelector` component,
which renders a row of colored `div`s. The `ColorSelector` component, as
suggested by its name, should contain the interface for selecting a color. Once
a color is selected, clicking on any particular `Cell` should cause that `Cell`
to change to the selected color.

### Update the Matrix Component

To achieve our goals, the `Matrix` component needs to have the following:

- A way for `Matrix` to keep track of the **selected color** (think _state!_)
- A method that takes in a single argument of a hexadecimal color string (i.e. '#fff')
  and sets the **selected color** to that

Once we have these set up, we'll need to figure out how to use the component's
state, as well as the method that will _update_ that state, in the
`ColorSelector` and `Cell` components.

#### Set Up State

In `src/Matrix.js`, there is no `state` set up. As we need a place to keep track
of the selected color, let's add it here:

```js
// src/Matrix.js
...

constructor() {
  super()
  this.state = {
    selectedColor: '#FFF'
  }
}

...
```

In this case, the default is set to `#FFF` (white), but you can choose choose whatever
hexadecimal color you'd like as default.

#### Create a Method to Update State

With a default color value set in state, we now need to add a method that can
_change_ that state value:

```js
// src/Matrix.js
...

setSelectedColor = (newColor) => {
  this.setState({
    selectedColor: newColor
  })
}

...
```

To keep it abstract, this method updates `selectedColor` with whatever is passed
into it as an argument.

#### Pass Data and Callbacks to Children

We already have two child components set to render, `ColorSelector` and `Cell`.
As mentioned, `ColorSelector` is the interface where users will be able to
select a color, so it will need access to `setSelectedColor`. We can
pass the needed function down as a prop:

```js
// src/Matrix.js
...

render() {
  return (
    <div id="app">
      <ColorSelector setSelectedColor={this.setSelectedColor} />
      <div id="matrix">
        {this.genMatrix()}
      </div>
    </div>
  )
}

```

`Cell`, on the other hand, only needs to know the currently selected color, not
change it. We can pass this in to every `Cell` returned by `genRow()` as a prop
called `selectedColor`:

```js
// src/Matrix.js
...
genRow = (vals) => (
  vals.map((val, idx) => <Cell key={idx} color={val} selectedColor={this.state.selectedColor} />)
)
...
```

Both child components are now receiving new props. After all the changes,
`Matrix` looks like this:

```js
import React, { Component } from 'react';
import learnSymbol from './data.js'
import Cell from './Cell.js'
import ColorSelector from './ColorSelector.js'

export default class Matrix extends Component {

  constructor() {
    super()
    this.state = {
      selectedColor: '#FFF'
    }
  }

  setSelectedColor = (newColor) => {
    this.setState({
      selectedColor: newColor
    })
  }

  genRow = (vals) => (
    vals.map((val, idx) => <Cell key={idx} color={val} selectedColor={this.state.selectedColor} />)
  )

  genMatrix = () => (
    this.props.values.map((rowVals, idx) => <div key={idx} className="row">{this.genRow(rowVals)}<div>)
  )

  render() {
    return (
      <div id="app">
        <ColorSelector setSelectedColor={this.setSelectedColor} />
        <div id="matrix">
          {this.genMatrix()}
        </div>
      </div>
    )
  }

}

Matrix.defaultProps = {
  values: learnSymbol
}
```

#### `ColorSelector`

The `ColorSelector` component already has some basic `div`s rendering:

```js
// src/ColorSelector.js
...
makeColorSwatches = () => (
  ["#F00", "#F80", "#FF0", "#0F0", "#00F", "#508", "#90D", "#FFF", "#000"].map((str, idx) => {
    return <div key={idx} className="color-swatch" style={{backgroundColor: str}}/>
  })
)

render() {
  return (
    <div id="colorSelector">
      {this.makeColorSwatches()}
    </div>
  )
}
...
```

Each `div` element is rendered from an array of hexadecimal color strings, with
its `backgroundColor` set to the value of the current string in the mapping
process.

We need to update this code so that when any one of these `div`s is clicked the
hexadecimal color value of that `div` becomes the selected color in `Matrix`. For
click events, we know we'll have to add an event and provide a callback on the `div`
element itself:

```js
return <div onClick={callback} key={idx} className="color-swatch" style={{backgroundColor: str}}/>
```

Inside this callback, we'll call `this.props.setSelectedColor()`, but where
would this callback function need to be defined?

...

...

So far, we've used class methods as callbacks, `this.handleClick` and
`this.handleSubmit`. This time is a little different - we'll need to write the
function inside the `map` to access the color values needed:

```js
...
makeColorSwatches = () => (
  ["#F00", "#F80", "#FF0", "#0F0", "#00F", "#508", "#90D", "#FFF", "#000"].map((str, idx) => {
    let callback = () => this.props.setSelectedColor(str)
    return <div onClick={callback} key={idx} className="color-swatch" style={{backgroundColor: str}}/>
  })
)
...
```

Clicking on a particular `div` inside `ColorSelector` should now set state in
`Matrix`.

#### `Cell`

To finish up this application, we now need to configure our `Cell` component so that
when it is clicked, it changes color to the currently selected color. In `Matrix`,
we're already passing down the selected color in `genRow()`:

```js
// src/Matrix.js
...
genRow = (vals) => (
  vals.map((val, idx) => <Cell key={idx} color={val} selectedColor={this.state.selectedColor} />)
)
...
```

So we should have `this.props.selectedColor` at our disposal. For `Cell`, we can set up another
click event, just like in `ColorSelector`, only this time, we'll use a `handleClick` class
method like we've seen before:

```js
import React, { Component } from 'react';

export default class Cell extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color
    }
  }
  
  handleClick = () => {
    this.setState({
      color: this.props.selectedColor
    })
  }

  render() {
    return (
      <div onClick={this.handleClick} className="cell"
           style={{backgroundColor: this.state.color}}
      >
      </div>
    )
  }
  
}
```

Run `npm start` and check out the results! You should be able to choose colors and 'paint'
on the cells:

<p align="center">
  <img src="http://curriculum-content.s3.amazonaws.com/react/callback-code-along-learn-symbol.gif" />
</p>

## Conclusion

In this code-along, we managed a piece of data in a parent component that was
used by one of its children and needed to be altered by another. By passing a
callback down as a prop, the `ColorSelector` component was able to cause a
change in state in its parent, `Matrix`. Each time the state changes, `Matrix`
re-renders, and all the `Cell` components receive the updated value for
`selectedColor`!

One way of thinking about this is that _information_ is passed **down** from
parent to child. Sometimes, that information can contain the instructions, in
the form of callbacks, for sending _actions_ **up**. This pattern is useful to
keep in mind as we build out more complex component trees.

