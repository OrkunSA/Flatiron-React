import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { expect } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from '../src/components/Game';
import Pancake from '../src/components/Pancake';

Enzyme.configure({ adapter: new Adapter() })


var clock;
beforeEach(function () {

     clock = sinon.useFakeTimers();
 });

describe('Game', () => {
  it('sets the initial time when the game was started in componentDidMount', () => {

    const gWrapper = mount(<Game />);
    gWrapper.update()
    expect(gWrapper.state().time).to.not.equal(undefined);

  });
});

describe('Pancake', () => {

  it('sets up the interval updating the cooking time every second', () => {
    const pWrapper = mount(<Pancake />);
    clock.tick(1010);
    pWrapper.find('button').simulate('click')
    pWrapper.update()
    expect(pWrapper.state('timeCooked')).to.equal(1);
  });

  it('calls componentWillUnmount', () => {

    let spy = sinon.spy(Pancake.prototype, "componentWillUnmount")

    const pWrapper = mount(<Pancake />);
    pWrapper.unmount()
    expect(Pancake.prototype.componentWillUnmount.calledOnce, "handleClick was not called").to.equal(true)
  });
});
