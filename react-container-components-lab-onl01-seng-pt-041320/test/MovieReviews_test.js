import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieReviews from '../src/components/MovieReviews';
import testReviews from './test-reviews';

Enzyme.configure({ adapter: new Adapter() })

const Noop = (props) => { return <p>Noop</p> };

function isStateless(Component) {
  return !Component.prototype.render;
}

describe('<MovieReviews />', () => {
  let wrapper;

  beforeEach(() => {
    if (!MovieReviews.prototype) {
      wrapper = shallow(<Noop />)
    } else {
      if (isStateless(MovieReviews)) {
        wrapper = shallow(<MovieReviews reviews={testReviews} />)
      } else {
        wrapper = mount(<MovieReviews reviews={testReviews} />)
      }
    }
  });

  it('should be a stateless functional component', () => {
    const tryToGetState = () => { wrapper.state(); }
    expect(MovieReviews.prototype, 'Component is not yet defined.').to.exist;
    expect(tryToGetState).to.throw(
      'ShallowWrapper::state() can only be called on class components',
      'Component should not have state.'
    );
  });

  it('should have a top-level component with class "review-list"', () => {
    expect(wrapper.hasClass('review-list')).to.be.true;
  });

  it('should render all the reviews', () => {
    expect(wrapper.find('.review').length).to.equal(testReviews.length);
  });
});
