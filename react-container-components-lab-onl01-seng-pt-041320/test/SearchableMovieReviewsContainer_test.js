import React from 'react';
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchableMovieReviewsContainer from '../src/components/SearchableMovieReviewsContainer';
import testReviews from './test-reviews';

import { spy, stub, useFakeTimers } from 'sinon'

Enzyme.configure({ adapter: new Adapter() })

const Noop = (props) => { return <p>Noop</p> };

function isStateless(Component) {
  return !Component.prototype.render;
}

describe('<SearchableMovieReviewsContainer />', () => {
  let wrapper;
  let fetchSpy;

  beforeEach(() => {
    global.fetch = require('node-fetch')

    fetchSpy = spy(global, "fetch")

    if (!SearchableMovieReviewsContainer.prototype) {
      wrapper = shallow(<Noop />)
    } else {
      if (isStateless(SearchableMovieReviewsContainer)) {
        wrapper = shallow(<SearchableMovieReviewsContainer />)
      } else {
        wrapper = mount(<SearchableMovieReviewsContainer />);
      }
    }
  });

  it('should have state', () => {
    const tryToGetState = () => { wrapper.state(); }
    expect(SearchableMovieReviewsContainer.prototype, 'Component is not yet defined.').to.exist;
    expect(tryToGetState).to.not.throw('Component should be class component.');
  });

  it('should have the state properties "reviews" and "searchTerm"', () => {
    expect(SearchableMovieReviewsContainer.prototype, 'Component is not yet defined.').to.exist;
    expect(wrapper.state()).to.have.all.keys('searchTerm', 'reviews');
  });

  it('should fetch data from the New York Times API on form submission', () => {
    let form = wrapper.find('form').first()
    form.simulate('submit', { preventDefault: () => {} })
    expect(fetchSpy.callCount > 0, "Fetch was not called").to.equal(true);
    expect(fetchSpy.firstCall.lastArg, "Fetch should have the base URL 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'").to.include('https://api.nytimes.com/svc/movies/v2/reviews/search.json?')
  })

  it('should render reviews after reviews state updated', () => {
    wrapper = !SearchableMovieReviewsContainer.prototype ?
      mount(<Noop />) : mount(<SearchableMovieReviewsContainer />);
    wrapper.setState({ reviews: testReviews });
    wrapper.update();
    expect(wrapper.find('.review').length).to.equal(testReviews.length);
  });
});
