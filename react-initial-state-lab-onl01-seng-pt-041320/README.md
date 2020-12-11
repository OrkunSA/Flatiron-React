# React Initial State Lab

## Overview

In this lab, you'll set initial state in a React component and distinguish
between state and props.

## Instructions

Follow the steps below and create two components, `ImageSlider` and `Bomb`.
Currently, `Bomb.js` and `ImageSlider.js` don't contain any code, so if you run
`learn` or `npm start`, you'll get an error. This is because our tests are trying to import and
use these components before they've been written.

So, before we continue, your first task is to create a simple components
for both `ImageSlider` and `Bomb`:

- In the `src/ImageSlider.js` file, create an `ImageSlider` React component.
- In the `src/Bomb.js` file, create a `Bomb` React component.

These components will need a valid `render` method to allow for our tests to
properly import and use them. Now, if you've created valid components, you should
be able to run `learn` to see the test results and run `npm start` to start the app.

## Image slider

Let's pretend we're making an awesome slider for our new portfolio site.
Naturally, we'll use React to do so! We have to start somewhere, so in this lab
we'll just focus on setting up the initial state of the slider.

1.  Its initial state should have a property called `currentSlideIndex` that
    starts at `0`.
2.  It should only render out the text `'I am on slide <CURRENT_SLIDE>'`, where
    `<CURRENT_SLIDE>` is the value of `this.state.currentSlideIndex`.

## A bomb timer

Take a moment to think about what a bomb does and how it works. Don't get all
into the nitty gritty — what we're going to focus on right now is the _timer_.

Let's create a component that represents a bomb timer that counts down until it
reaches `0`. However, the only thing we're going to focus on right now is
setting the initial state of the bomb: the amount of seconds left on the timer.
Since bomb timers can differ, we'll pass in a prop to our `Bomb` component to
determine what the starting count should be.

1.  The initial state of `Bomb` should have a property called `secondsLeft`.
2.  The initial value of `secondsLeft` should be equal to the `initialCount` 
    prop of our `Bomb` component.
    
    We'll need to learn how to set an intial state _based off that component's props_. 
    React passes a component's props as an argument into the constructor (i.e., `constructor(props)`). 
    Remember to call `super()` on the first line of the constructor (this is
    required in React components if we are to use `this` in the constructor).
    Ultimately, our constructor should look something like this:
   
    ```js
    constructor(props) { //props that the component gets from its parent
      super()
      this.state = { //define initial state with a key of 'someKey' set to the 'someValue' prop
        someKey: props.someValue
      }
    }
    ```
3.  As an extra step for understanding, you can open in the `index.js` file to 
    see how we are passing the `initialCount` prop to `Bomb`
4.  It should render the text `'<SECONDS_LEFT> seconds left before I go boom!'`,
    where `<SECONDS_LEFT>` is the value of `secondsLeft`.
5.  **If `secondsLeft` equals `0`, it should render `'Boom!'` instead.**

## Resources

- [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)

