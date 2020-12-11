import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Adapter from 'enzyme-adapter-react-16'

import ImageSlider from '../src/ImageSlider'
import Bomb from '../src/Bomb'

configure({ adapter: new Adapter() });


describe('<ImageSlider />', () => {
  const wrapper = shallow(<ImageSlider />);

  it('should set the `currentSlideIndex` to 0 on its state', () => {
    expect(wrapper.state('currentSlideIndex')).to.equal(0);
  });

  it('render the correct text', () => {
    expect(wrapper.text()).to.equal('I am on slide 0');
  });
});


describe('<Bomb />', () => {
  const wrapper = shallow(<Bomb initialCount={120} />);

  it('should set the `secondsLeft` to the value of the `initialCount` prop', () => {
    expect(wrapper.state('secondsLeft')).to.equal(120);
  });

  it('render the correct text when the timer is not 0', () => {
    expect(wrapper.text()).to.equal('120 seconds left before I go boom!');
  });

  it('render the correct text when the timer is 0', () => {
    const wrapper = shallow(<Bomb initialCount={0} />);
    expect(wrapper.text()).to.equal('Boom!');
  });
});
