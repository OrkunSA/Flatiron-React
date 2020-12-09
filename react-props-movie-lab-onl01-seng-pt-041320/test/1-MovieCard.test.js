import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import MovieCard from '../src/card-components/MovieCard'


describe('<MovieCard />', () => {
  
  it("assigns a default prop of 'Unknown' for the title prop", () => {
    expect(MovieCard.defaultProps.title.toLowerCase()).to.equal('unknown')
  })
  
  it("assigns a default prop of null for the IMDBRating prop", () => {
    expect(MovieCard.defaultProps.IMDBRating).to.equal(null)
  })
  
  it("assigns a default prop of ['No Genre(s) Found'] for the genres prop", () => {
    expect(JSON.stringify(MovieCard.defaultProps.genres)).to.equal(JSON.stringify(['No Genre(s) Found']))
  })
  
  it("assigns a default prop of 'default' for the poster prop", () => {
    expect(MovieCard.defaultProps.poster.toLowerCase()).to.equal('default')
  })
  
})
