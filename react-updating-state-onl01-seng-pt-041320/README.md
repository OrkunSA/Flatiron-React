# React Updating State

## Overview

In this code along, we'll discuss updating state in React and create an
component that will change what it displays based on state.

## Objectives

- Update state in React by using `this.setState()` and passing in an object
- Describe what happens when state is updated
- Explain the difference between changing state and changing props

## Updating State

![Unknown state](https://media.giphy.com/media/fFIaNdVhdvoOc/giphy.gif)

While a React component can have initial state, the real power is in _updating_
its state — after all, if we didn't need to update the state, the component
shouldn't _have_ any state. State is only reserved for data that _changes_ in
our component and is visible in the UI.

Instead of directly modifying the state using `this.state`, we use
`this.setState()`. This is a function available to all React components that use
state, and allows us to let React know that the component state has changed.
This way the component knows it should re-render, because its state has changed
and its UI will most likely also change. Using a setter function like this is
very performant. While other frameworks like Angular.js use "dirty checking"
(continuously checking for changes in an object) to see if a property has
changed, React _already knows_ because we use a built-in function to let it know
what changes we'd like to make!

> **Note**: In this code-along, use the code in the `src` to follow along. To
> run the code, make sure to `npm install & npm start` in the terminal.

For example, let's say we have a component with a button, and a bit of text to
indicate whether that button has been pressed yet:

```js
// src/components/ClickityClick.js
import React from 'react';

class ClickityClick extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      hasBeenClicked: false
    };
  }

  handleClick = () => {
    // Update our state here...
  };

  render() {
    return (
      <div>
        <p>I have {this.state.hasBeenClicked ? null : 'not'} been clicked!</p>
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }
}

export default ClickityClick;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import ClickityClick from './components/ClickityClick';

ReactDOM.render(<ClickityClick />, document.getElementById('root'));
```

To update our state, we use `this.setState()` and pass in an object. This object
will get merged with the current state. When the state has been updated, our
component re-renders automatically. Handy!

```js
// src/components/ClickityClick.js
...

handleClick = () => {
  this.setState({
    hasBeenClicked: true
  })
}

...
```

Update `src/components/ClickityClick.js` and `src/index.js` using the code
snippets above to see the rendered text change once the button is clicked.

## How State Gets Merged

When updating state, we don't have to pass in the entire state, just the
property we want to update. For example, consider the following state for our
component:

```js
{
  hasBeenClicked: false,
  currentTheme: 'blue',
}
```

If we updated the `hasBeenClicked` using `this.setState()` like we did above, it
would _merge_ the new state with the existing state, resulting in this new
state:

```js
{
  hasBeenClicked: true,
  currentTheme: 'blue',
}
```

One super important thing to note is that it only merges things on the first
level. Let's say we're working on a component that lets a user fill in an
address, and the component's state is structured like this:

```js
{
  theme: 'blue',
  addressInfo: {
    street: null,
    number: null,
    city: null,
    country: null
  },
}
```

If we wanted to update the `addressInfo.city` field, you might think we can
update it like this:

```js
this.setState({
  addressInfo: {
    city: 'New York City'
  }
});
```

**However**, this would result in the following state shape:

```js
{
  theme: 'blue',
  addressInfo: {
    city: 'New York City',
  },
}
```

See what happened there? It _merged_ the state, but the other key/value pairs in
`addressInfo` get overwritten, because it doesn't _deeply_ merge the state with
the object you pass into `this.setState()`. A deep merge means that the merge
will happen recursively, leaving any unchanged properties intact. For example,
consider the following code sample:

```js
const house = {
  kitchen: {
    cabinets: 'white',
    table: {
      legs: 4
    }
  }
};

// Note: `deepMerge()` isn't actually a built-in function
const updatedHouse = deepMerge(house, {
  kitchen: {
    table: {
      legs: 8
    }
  }
});
```

Deeply merging like this would only update the `legs` property with a value of
`8`, but the rest of the `kitchen` and `house` objects' structure will remain
intact.

We can solve this using `Object.assign()` by merging the `addressInfo` object
with the new data ourselves:

```js
this.setState({
  addressInfo: Object.assign({}, this.state.addressInfo, {
    city: 'New York City'
  })
});
```

**Or**, we could do this the **RECOMMENDED** way, by using the spread operator in JS:

```js
this.setState({
  addressInfo: {
    ...this.state.addressInfo,
    city: 'New York City'
  }
});
```

> The [spread operator][so] syntax can be used in JavaScript to 'de-compose' objects and
> arrays. When used on an object as we see above, `...this.state.addressInfo`
> returns all the keys and values from within that object. We're saying `addressInfo`
> should be equal to all the keys and values that make up `addressInfo`, and, in
> addition, there should be `city` key with the value `New York City`. If there
> is already a `city` key inside `addressInfo`, it will be overwritten. If it
> doesn't exist, it will be added.

Both of these would result in the state updating to this shape:

```js
{
  theme: 'blue',
  addressInfo: {
    street: null,
    number: null,
    city: 'New York City',
    country: null
  },
}
```

Perfect! Just what we needed.

## Setting state is not synchronous

One thing to keep in mind is that setting state is _not_ synchronous. For all
intents and purposes, it might seem that way, since our components update right
away. State updates, however, are _batched_ internally and then executed
simultaneously whenever React feels it's appropriate. This might result in some
unexpected behavior. Going back to our `ClickityClick` component above, let's
log the state after we've set it using `this.setState()`:

```js
// src/components/ClickityClick.js

...

handleClick = () => {
  this.setState({
    hasBeenClicked: true
  })
  console.log(this.state.hasBeenClicked); // prints false
}

...
```

The console output says `false`... but we just set it to `true`! What is this madness?

State changes, however instant they might appear, happen _asynchronously_. If we
want to access our new state after it has been updated, we can optionally add a
callback as a second argument to the `this.setState()` function. This callback
will fire once the state has been updated, ensuring that `this.state` is now the
new, shiny updated state. In code:

```js
// src/components/ClickityClick.js

...

handleClick = () => {
  this.setState({
    hasBeenClicked: true
  }, () => console.log(this.state.hasBeenClicked)) // prints true
}

...
```

## State Changes vs. Prop Changes

![Not the same thing!](http://4.bp.blogspot.com/-YpCHzw3WdTo/UzNBI3BzYKI/AAAAAAAAJoY/S34pUkXKhUU/s1600/aaa.png)

It's important to note the difference between changes in state and changes in
props. Changes in state and/or props will both trigger a re-render of our React
component. However, changes in state can only happen _internally_ due to
components changing their own state. Thus, a component can trigger changes in
its own state.

A component _cannot_ change its props. Changes in props can only happen
_externally_, meaning the parent or grandparent component changes the
values it passing down to its children.

## Updating State Based on the Previous State

Very often when we're changing state, the change we're making is relative to the
previous state. Imagine, for instance, we wanted to use state to keep track of
the number of times a button is pressed. The component's state might start at
`0`. When the button is pressed, state should change to `1`. However, if pressed
again, how exactly do we change state to `2`?

The easiest solution would be to write code that sets state to its **current
value plus one**. However, when we write this in code and implement `setState`,
it is important to note that we **should not use `this.state` inside of
`setState`**.

As mentioned before, `setState` is not synchronous &mdash; in situations where
there are many state changes being made, multiple `setState` calls may be
grouped together into one update. If we use `this.state` inside a `setState`, it
is possible that the values in state are changed by a _different_ `setState`
just prior to our `setState`.

One way to deal with this is to handle the logic that involves `this.state`
outside of `setState`. Below is an example of a component that uses this
approach to keep track of button presses:

```js
import React, {Component} from 'react';

class ButtonCounter extends Component {
  constructor() {
    super()
    // initial state has count set at 0
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    // when handleClick is called, newCount is set to whatever this.state.count is plus 1 PRIOR to calling this.setState
    let newCount = this.state.count + 1
    this.setState({
      count: newCount
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

export default ButtonCounter
```

This works, but React actually provides a built in solution. Instead of passing an object
into `setState`, we can also pass a function. That function, when called inside `setState`
will be passed the component state from when that `setState` was called. This is typically
referred to as the _previous state_. With this knowledge, we can rewrite the `handleClick`
function to:

```js
...

handleClick = () => {
    this.setState(previousState => {
      return {
        count: previousState.count + 1
      }
    })
  }

...
```

Here, there is no need for a separate variable assignment like
`let newCount = this.state.count + 1`. It is important that we still
**return** an object that was in the same structure as before as the
return value of this function becomes the new state.

Let's look at another example - In the `ClickityClick` example earlier, we were
changing state from `false` to `true` with a hard-coded `true` in the `setState`.
What if, instead, we wanted the ability to toggle between `true` and `false`
repeatedly?

Here again, previous state is very useful. Since we're dealing with a boolean value,
to toggle from one to the other, we just need to set the state to the _opposite_ of
whatever it is.

This component, let's call it `LightSwitch`, would look something like this:

```js
import React from 'react';

class LightSwitch extends React.Component {
  constructor() {
    super();

    // Initial state is defined
    this.state = {
      toggled: false
    };
  }

  // when handleClick is called, setState will update the state so that toggle is reversed
  handleClick = () => {
    this.setState(previousState => {
      return {
        toggled: !previousState.toggled
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.toggled ? "ON" : "OFF"}</button>
      </div>
    );
  }
}

export default LightSwitch;
```

When the code above renders, it will display a button labeled `OFF` until it is
clicked. When clicked, it will display `ON`. Click once more, and it is back to
`OFF`.

Some additional details on `setState` can be found in [React's official
documentation][].

## Conclusion

To recap: Using `setState`, we can update a component's state. We frequently use
events to trigger these updates. `setState` is called asynchronously and merges
the existing state with whatever object is passed in. We can also pass a
function to `setState`, which allows us to write state changes that are based on
the existing state values.

Being able to update state can be extremely useful in many situations. We can
use state to keep track of incrementing values and toggle-able boolean values. We
can also use it to keep track of things like timestamps, user inputs, and
in-line style settings. State can store arrays as well, which we now have the
ability to update and add to!

## Resources

- [State and Lifecycle][React's official documentation]
- [Transferring props](https://facebook.github.io/react/docs/transferring-props.html)
- [Component API](https://facebook.github.io/react/docs/component-api.html)

[so]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[React's official documentation]: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
