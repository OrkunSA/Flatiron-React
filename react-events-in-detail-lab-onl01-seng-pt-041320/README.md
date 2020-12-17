# React Events in Detail

## Overview

In this lab, we will practice using event data and persisting events. We will be
working with event data you may not be familiar with: `event.clientX` and
`event.clientY`. These provide the current x/y position of a mouse. Links are
provided in the resources section to learn more.

## Two Buttons To Rule Them All

![Using buttons](https://media.giphy.com/media/HraQGUYyPxDz2/giphy.gif)

In this lab, you'll be working on two components — two buttons, to be more
precise. These aren't just regular buttons, however! They both serve a very
specific purpose.

## Instructions

In `src/index.js`, code for a basic React app is already provided. Two of the
components referenced, `CoordinatesButton` and `DelayedButton`, are being passed
props. However, these components are not written yet, causing the application
(and `learn`) to crash. Using the provided component files, follow the
instructions below to create these components. Run `learn` to track your
progress through the lab.

#### `CoordinatesButton`

1.  In the `components/CoordinatesButton.js` file, create a `CoordinatesButton`
    React component.

2.  This component takes in one prop: `onReceiveCoordinates`. This prop is a
    _function_ passed down from `index.js`. This function is currently just logging
    whatever is passed into it.

3.  Within `CoordinatesButton`, render a button. On click of the button,
    create an array with two elements: the X and Y coordinates of the mouse. Find
    these using the event data.

4.  Pass this event data in as the argument for the `onReceiveCoordinates` prop.

5.  If successful, the current x,y position of your mouse should be logged.

#### `DelayedButton`

1.  In the `components/DelayedButton.js` file, create a `DelayedButton` React
    component

2.  This component takes two props: `onDelayedClick` (a function), and `delay` (a
    number).

3.  Create a button that, when clicked, will pass the click event to the
    `onDelayedClick` prop _within_ a `setTimeout()`. The `setTimeout()`
    should be set to `this.props.delay`.

4.  If successful, the event will be logged to the console once the timeout has
    finished.
    
5.  Hint: If you having trouble with this feature, remember event pooling in React. By the time the setTimeout fires, the event object will have already been returned to the pool. So how can we fix that?

## Resources

- [React Mouse Events](https://facebook.github.io/react/docs/events.html#mouse-events)
- [ClientX Mouse Event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
- [ClientY Mouse Event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
