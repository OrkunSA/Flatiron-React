import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('<Cell />', () => {
  
  try {
    var Cell = require('../src/Cell').default
  } catch(e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log("Have you exported your <Cell /> component?");
      it("is exported", () => {expect(false).to.equal(true)})
      return
    }
  }
  
  let cellWhite
  
  beforeEach(() => {
    cellWhite = shallow(<Cell value="#fff"/>);
  });

  it("is a correctly defined and exported React component which renders a <div> with a className of 'cell'", () => {
    expect(cellWhite.find('.cell')).to.have.length(1)
  })
  
  it("has a state key of 'color'", () => {
    expect(cellWhite.state().hasOwnProperty('color')).to.equal(true)
  })

  it("state.color is initially set to the 'value' prop passed from Matrix", () => {
    const cellBlack = shallow(<Cell value="#000"/>)
    expect(cellWhite.state('color')).to.equal('#fff')
    expect(cellBlack.state('color')).to.equal('#000')
  })

  it("has an event listener for clicks on the <div> (don't forget: 'onClick' in React!)", () => {
    expect(cellWhite.props().hasOwnProperty('onClick')).to.equal(true)
  })

  it("has an event listener that, when clicked, calls this.setState() once (make sure you aren't setting state directly, but instead using the component's 'setState' method)", () => {
    const setState = sinon.spy(Cell.prototype, 'setState');
    cellWhite.find('div').simulate('click')
    expect(setState.calledOnce).to.equal(true);
  })

  it("has an event listener that, when clicked, sets state's 'color' key to a value of '#333'", () => {
    cellWhite.find('div').simulate('click')
    expect(cellWhite.state('color')).to.equal('#333')
  })

  it("sets the <div>'s inline style attribute to 'style={{backgroundColor: this.state.color}}'", () => {
    expect(cellWhite.props().style.hasOwnProperty('backgroundColor')).to.equal(true)
    expect(cellWhite.props().style.backgroundColor).to.equal('#fff')
    cellWhite.setState({ color: '#0f0' })
    expect(cellWhite.props().style.backgroundColor).to.equal('#0f0')
  })
  

})
