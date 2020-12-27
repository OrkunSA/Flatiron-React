# React: Component Mounting and Unmounting

## Objectives

1. Describe what happens in the updating phase of the React component lifecycle
2. Briefly introduce React Refs and their role in the component lifecycle
3. Practice using `shouldComponentUpdate` and `componentDidUpdate`.

## Overview

In a previous lab, we worked on an app, _MultiTimer_, the solution to all of our
needs involving multiple timers. Well, sort of. It only really worked for 1
second timers. In this lab, we're going to implement some extra features using
the component lifecycle update methods.

The app is functioning and already has the `componentDidMount` method being used
in both the `App.js` and `Timer.js`. In App, `componentDidMount` calls a method
to add one initial timer. In Timer, `componentDidMount` initializes an interval.

The interval within Timer is set based on the prop `updateInterval`. If you take
a look at App, you can see that this is a state value that is being set using
the Controls component and a method `updateIntervalSetting`.

This set up allows us to mount multiple Timers that tick at _different_
intervals. Each Timer component is keeping track of its own time using the state
value, `time`. The `this.clockTick` method, called from the set interval,
handles updating `time`, incrementing it by the `updateInterval`.

Within App, the `updateInterval` value is captured in an object for each Timer,
allowing Timers to have differing intervals.

Go on and run the app with `npm start` and add a few timers at any interval. You
can see a little bit of the awesomeness of the React updating here - each Timer
is updating independently based on its own time interval, leaving the rest of
the page unaffected. Using component lifecycle methods, we can jump into
specific points during this updating process using `shouldComponentUpdate` and
`componentDidUpdate`.

#### `componentDidUpdate` and React Refs

Let's start with `componentDidUpdate`. This method is called after every
component re-render. It does not get called when the component is mounted. The
major use case for `componentDidUpdate` is to allow for 'post-processing'
actions. I.e. You're using a 3rd party animation library and want to trigger an
animation. You can, however, also use it as a way to manipulate the DOM
_outside_ of using JSX.

For example, `componentDidUpdate` could be used to scroll to the bottom of a
chatroom window every time a new message is received. Another example: setting
the focus on a particular part of a form. Both of these examples are actually
very difficult to achieve _without_ manipulating the DOM in
`componentDidUpdate`.

Because there are specific use cases, React has provided us a way to get access
to DOM elements using something called a `ref`. You can see an example of a
`ref` in Timer:

```js
constructor() {
  super()
  this.timer = React.createRef()
  ...
}

...

render() {
  const { time, color, className, logText } = this.state
  return (
    <section className="Timer" style={{background: color}} ref={this.timer}>
    ...
  )
}
```

In Timer, a class variable, `this.timer`, is initialized in the constructor. An
attribute, `ref`, is then _added_ to a specific JSX element, in this case, `section`.

Once the Timer component mounts, it is possible to access the DOM node,
`section`, using the associated `ref` attribute. To access the DOM using
`this.timer`, we just need to write `this.timer` followed by `current`:

```js
console.log(this.timer.current);
//outputs <section class="Timer" ... > ... </section>
console.log(this.timer.current.style.background);
//outputs the background color, something like rgb(62, 132, 219)
```

With `this.timer.current.style`, we can access and modify many style properties.
We can and already are modifying the style of our Timer components using state
(the background color is set by state). Using a ref in `componentDidUpdate` to
change style properties _will override_ any styling set up in the `render()`,
but won't set state.

To pass the first test in this lab, write `componentDidUpdate` within Timer. Use
the provided ref to manipulate the DOM node to visually confirm. One suggestion:

```js
this.timer.current.style.color =
  "#" + Math.floor(Math.random() * 16777215).toString(16);
```

This will change the font color randomly. `componentDidUpdate` fires every time
the component updates.

Changing the font color here may make it clearer to observe - each Timer is
updating based on the interval, but _is also subject_ to updates to the state of
its parent component, App. App's state is connected to the buttons within the
Controls component, so when the `-` and `+` buttons are pressed, it causes App,
and subsequently, each Timer, to update.

**A Note About Refs:** React builds a _virtual DOM_ when it renders JSX,
allowing it to update the actual DOM in a very efficient way. Accessing the
DOM directly comes with some caution as it circumvents React's default behavior.
For this reason, it is better to handle most style changes using an external CSS
file or in-line within JSX, if possible.

#### `shouldComponentUpdate`

**Most of the time, we want to let React handle its updating.** Although
component updating may be happening nearly constantly on a React app, it is
usually imperceptible to the user.

There are cases, though, where you may want to limit how often a component
updates, or control what triggers an update. For these reasons, we have
`shouldComponentUpdate`.

The `shouldComponentUpdate` method fires just before a component commits to
updating. If `true` is returned from the method, the component will update.

As mentioned in the previous section, every time App's state changes, it causes
its Timer children to update. We can actually intercept and stop this from
happening.

`shouldComponentUpdate` takes in two arguments, the _next_ props and state from
the potential update. That is to say, when a component is _about to_ update, it
calls `shouldComponentUpdate`, passing in the new props and state. Whatever the
return value is will determine if the component will continue with the update
process. Because of this, from within `shouldComponentUpdate`, we have access
to both the _current_ props and state, accessible with `this.state` and
`this.props`, and the _next_ props and state, represented below as `nextProps`
and `nextState`:

```js
shouldComponentUpdate(nextProps, nextState) {
  if (this.state.time === nextState.time) {
    return false
  }
  return true
}
```

Include the above `shouldComponentUpdate` method in Timer. In regards to the
Timer component updating, the only time we really need to update is when
`this.state.time` changes. Including this code prevents unnecessary updates
being caused by App's state changes.

The result is that the DOM changes you've made in `componentDidUpdate` will only
take effect when a Timer increments.

Run `learn` to confirm you've passed the tests for adding `componentDidUpdate`
and `shouldComponentUpdate` to the Timer component.

## Conclusion

To quickly recap, the `componentDidUpdate` method is useful for DOM manipulation
and updating 3rd party libraries. `shouldComponentUpdate` is useful in stopping
unwanted component updates and is mainly used for performance enhancement.

As we explore async calls in React, we'll see additional examples of when the
component lifecycle can be useful.

## Bonus - Pure Components

If you've passed your tests, there is an additional bit of information you may
find useful - [Pure Components][pure]. Pure components **do not implement
`shouldComponentUpdate`**. Instead, a pure component automatically does a
comparison of current and next props and state, and only updates if it registers
a change.

The only change that registers for our Timer components is the change in
`this.state.time`. This means that instead of including this:

```js
shouldComponentUpdate(nextProps, nextState) {
  if (this.state.time === nextState.time) {
    return false
  }
  return true
}
```

We can just change from a Component to a PureComponent:

```js
import React, { PureComponent } from 'react';

class Timer extends PureComponent {
  ...
}
```

And get an instant, easy reduction in unnecessary updates!

## Resources

- [React: Component Specs and Lifecycle](https://reactjs.org/docs/react-component.html)

[pure]: https://reactjs.org/docs/react-api.html#reactpurecomponent
