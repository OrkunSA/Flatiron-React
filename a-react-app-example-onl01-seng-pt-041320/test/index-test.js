import { expect } from 'chai';
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import App from '../src/App'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  let wrapper;

  before(() => {
    wrapper = shallow(React.createElement(App));
  });

  it('should include "Now" in the header instead of a time', () => {
    expect(wrapper.find('header').text()).to.not.include(moment().format('MMMM Do YYYY'))
    expect(wrapper.find('header').text()).to.include('Now')
  });

  it('should include the ExampleComponent', () => {
    expect(wrapper.text()).to.include('<ExampleComponent />')
  });

  it('should include the TestComponent', () => {
    expect(wrapper.text()).to.include('<TestComponent />')
  });
});

// describe('InFrontOfYou', () => {
//   let wrapper;
//
//   before(() => {
//     wrapper = shallow(React.createElement(InFrontOfYou));
//   });
//
//   it('renders withouth crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<InFrontOfYou />, div);
//   });
//
//   it('should have the right DOM markup', () => {
//     expect(wrapper.html()).to.equal(`<div><p>You shouldn&#x27;t look too far.</p><p>Sometimes, the solution is right in front of you.</p></div>`);
//   });
// });
//
// describe('ButcherShop', () => {
//   let wrapper;
//
//   before(() => {
//     wrapper = shallow(React.createElement(ButcherShop));
//   });
//
//   it('renders withouth crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<ButcherShop />, div);
//   });
//
//   it('should have the right DOM markup', () => {
//     expect(wrapper.html()).to.equal(`<div class="butcher-shop"><p>Hello! We have the following products for sale today:</p><ul><li>Tenderloin</li><li>Short ribs</li><li>Beef shin</li><li>Ribeye</li></ul></div>`);
//   });
// });
