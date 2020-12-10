# React Events Crash Course Lab


## Objectives

1. Practice affixing and handling Synthetic Events in React


## Introduction

Meet [Chrome Boi][chrome-boi]! He's a Boi dressed as Google Chrome, and he's going to be
joining you in this lab!

We're going to jump right into a React application and add event capturing + handling
functionality. We have a simple single component application that renders a
900x600 canvas. All of our work will be done in `src/ChromeBoisDomain.js`.

For this lab, minimal guidance will be given. If you run into trouble, you are
expected to reference the React Crash Course ReadMe lesson and React
documentation on events:

- [React Synthetic Events](https://reactjs.org/docs/events.html)
- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [Supported Events](https://reactjs.org/docs/events.html#supported-events)


## Deliverables

- Finish implementing the `handleMouseMove` method. This method should capture the `x` and `y` coordinates of the mouse from the event and use them to invoke the `drawChromeBoiAtCoords` function that has been provided and is already imported (`drawChromeBoiAtCoords` expects two arguments, an x and a y coordinate)
- Add an event listener to the `<canvas>` element to capture a click. Create an event handler which, when fired, invokes the provided `toggleCycling` function (with no arguments)
- Add an event listener to the `<canvas>` element to capture when a key is pressed. When a key is pressed, an event handler should invoke the provided `resize` function with a single argument of either '+' or '-':
  - If the key pressed was 'a', then it should invoke `resize` and pass in '+'.
  - If the key pressed was 's', then it should invoke `resize` and pass in '-'.
  - You'll only be able to register a Keyboard event if the canvas is in focus. So on load of the page, either click the canvas for press the tab key to test out this feature.

**Hints:**
- You do not need any state in this application to make it work. The focus of this lab is practicing event handling in React.
- The functions `drawChromeBoiAtCoords`, `toggleCycling`, and `resize` are NOT props. They are functions exported from the `canvasHelpers.js` file, so you can't call them off `this.props`; just invoke them like a regular function. 

#### Once Finished

`npm start` and assert the following expected behavior:

- As the mouse moves around the canvas element in the browser, ChromeBoi is constantly drawn to the screen
- If the user clicks on the canvas, ChromeBoi begins cycling colors as he is drawn
- If the user presses either 'a' or 's' (while the canvas is on focus), ChromeBoi begins drawing either larger or smaller


## Resources
- [React Synthetic Events](https://reactjs.org/docs/events.html)
- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [Supported Events](https://reactjs.org/docs/events.html#supported-events)


[chrome-boi]: https://en.everybodywiki.com/Chrome_Boi
