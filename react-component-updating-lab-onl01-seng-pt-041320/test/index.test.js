import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Timer from '../src/Timer';

describe('<Timer />', () => {
  var timerWrapper

  it('calls componentDidUpdate', () => {

    expect(Timer.prototype.componentDidUpdate, "componentDidUpdate was not found").to.not.equal(undefined)
    stub(Timer.prototype, "componentDidUpdate")

    timerWrapper = shallow(<Timer />);

    timerWrapper.setState({ time: 1, color: '#6134ac' })


    expect(Timer.prototype.componentDidUpdate.calledOnce, "componentDidUpdate was not called").to.equal(true);

    timerWrapper.unmount()
  });

  it('calls shouldComponentUpdate', () => {
    expect(Timer.prototype.shouldComponentUpdate, "shouldComponentUpdate was not found").to.not.equal(undefined)
    stub(Timer.prototype, 'shouldComponentUpdate');

    timerWrapper = shallow(<Timer />);

    timerWrapper.setState({ time: 1, color: '#6134ac' })

    expect(Timer.prototype.shouldComponentUpdate.calledOnce).to.equal(true);
    timerWrapper.unmount()
  })

});
