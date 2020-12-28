# React Presentation Components Lab

## Overview

In this lab, you'll write two components:

1. A presentation component with minimal UI state
2. A so-called stateless function

## Overview

A truth in programming is this: managing state is **hard**. We humans know
this: imagine taking lunch orders for a small group of colleagues or friends.
Say everyone orders a sandwich. If you poll your friends you're going to
rapidly exceed the human brain's memory capacity:

* "If they have capicola, I want that, but if they don't have it, I want ham
  with mustard, but only if that mustard is spicy."
* "PB&amp;J! #simplelife #yolo"
* "I'll have whatever the vegan options is, unless it's soy-patty. In that
  case, nothing.  I'm a vegan, but that stuff is _awful_."

The same is true for complex applications, especially front end applications.
If the user is logged in but hasn't selected a checkbox yet then we should
prompt them to." Keeping up with all that _state_ is hard to do as a
programmer.

To help React developers signal to _other_ React developers that something on
the screen is _simple_ and has ***no state*** impact and is also ***not
affected by state***, React has a concept called a "presentational component"
or a "simple component." They're called that because, other than rendering
themselves or using props data, they really don't know how to do much else. 

Typically they're simply a single function that returns JSX. It's as simple as
a React component can be. They look something like:

```js
const ComponentName = props => <div onClick={props.handleClick}>I am just happy.</div>
```

We have an arrow function that takes one argument, `props` and then renders
some JSX. That's ***it***. It doesn't get much simpler in React-land.

As a comparison, Components that need to use state look more like this:

```js
class ComponentName extends Component {
  constructor(props) {
    super(props);

    // Initial state here...
    this.state = {
    };
  }

  handleClick = () => {
    // Probably do some work to update the state
  }

  render() {
    // Return JSX that renders into HTML
  }
}
```

In this lab, we'll illustrate this principle by building two components:

1. A `SimpleComponent`: Our `SimpleComponent` will be a component with a tiny
   bit of state. It won't be _quite_ as simple as things could be. It will have
   a full component class declaration and will need to manage a `state` variable.
2. A `SimplerComponent`: a "stateless functional" component

## SimpleComponent

The specs for our `SimpleComponent` require the following:

1. In the `components/SimpleComponent.js` file, create a `SimpleComponent`
component.

2. The component should be declared as a class (instance of `Component`) so that it
can carry state.

3. The component should have a state property called `mood` that has a default
value of `happy`.

4. The component should simply render its current `mood` state to the page in a
div.

5. The component should implement a `handleClick` function that can serve as a
callback to the `<div>`'s click event. When clicked, the component's mood should
toggle between `happy` and `sad` states.

## SimplerComponent

The specs for our `SimplerComponent` require the following:

1. In the `components/SimplerComponent.js` file, create a `SimplerComponent` component.

2. The component should be a "stateless functional" component.

3. It should render a `<div>` to the page that contains the text: "I am just happy".

4. If you open the `index.js` file, you'll see that `SimplerComponent` receives
   one prop called `handleClick` that is currently `undefined`. Rewrite this
   prop to perform any action of your choice! Then, make sure `SimplerComponent`
   can trigger this action when it's clicked on.

## Synthesize

When you've finished `SimpleComponent` and `SimplerComponent`, take a moment to
compare them to each other.

See how `SimplerComponent` has no
ability to change its output internally? We can always know, based on the props
that we provide, what type of output it will produce. Note, as well, that
this doesn't mean that the component lacks interactivity. We can actually
determine a wide variety of click behaviors on the component just by providing 
different information via the `props` `Object` when we use the component.

This kind of "simpleness" is actually a good thing because it makes our
component more predictable and easier to maintain. If we have a single store
from which state is passed, bubbling downward via `props` to components like
`SimplerComponent` debugging and maintaining the components is much easier than
when a component needs to manage state as well.

A good bit of advice would be to start with a simple presentational component
(like `SimplerComponent`) and _only when_ you _can't_ make it work without
container-held state, change it to be a full Component. Developers like to
constrain themselves to be as simple as possible until they absolutely have to
be more complex. In the long run, this is a good heuristic for creating code
that scales and is easy to debug.

## Resources

- Dan Abramov – ["Presentational and Container Components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)
