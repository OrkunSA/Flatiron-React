import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import CoordinatesButton from '../src/components/CoordinatesButton';
import DelayedButton from '../src/components/DelayedButton';

Enzyme.configure({ adapter: new Adapter() })

const MOCKED_EVENT = {
  clientX: 5,
  clientY: 5,
  screenX: 5,
  screenY: 5,
  pageX: 5,
  pageY: 5,
  persist: sinon.spy()
};

const DELAY = 50;

describe('<CoordinatesButton />', () => {
  const spy = sinon.spy();
  const wrapper = shallow(<CoordinatesButton onReceiveCoordinates={spy} />);

  afterEach(function () {
    spy.reset();
  });

  it('should have one button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });

  it('should call the callback prop when the button is clicked', () => {
    wrapper.find('button').simulate('click', MOCKED_EVENT);
    expect(spy.firstCall.args[0]).to.be.an('array');
  });

  it('should pass the right coordinates to the callback prop', () => {
    wrapper.find('button').simulate('click', MOCKED_EVENT);
    expect(spy.firstCall.args[0][0]).to.equal(5);
    expect(spy.firstCall.args[0][1]).to.equal(5);
  });
});

describe('<DelayedButton />', () => {
  const spy = sinon.spy();
  const wrapper = shallow(<DelayedButton onDelayedClick={spy} delay={DELAY} />);

  afterEach(function () {
    spy.reset();
    MOCKED_EVENT.persist.reset();
  });

  it('should have one button', () => {
    expect(wrapper.find('button').length).to.equal(1);
  });

  it('should call the callback prop after the delay', (done) => {
    wrapper.find('button').simulate('click', MOCKED_EVENT);
    setTimeout(() => {
      expect(spy.calledOnce, 'The `onDelayedClick` prop was not called after the delay.').to.be.true;
      done();
    }, DELAY + 1);
  });

  it('should pass the event to the callback prop', (done) => {
    wrapper.find('button').simulate('click', MOCKED_EVENT);
    setTimeout(() => {
      expect(MOCKED_EVENT.persist.calledOnce, 'The event passed to the callback prop is being pooled').to.be.true;
      expect(spy.firstCall.args[0]).to.equal(MOCKED_EVENT, 'The event is not being passed to the callback prop.');
      done();
    }, DELAY + 1);
  });
});
