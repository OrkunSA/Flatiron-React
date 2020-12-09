import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import CardFront from '../src/card-components/CardFront'

describe('<CardFront />', () => {
  
  it('uses the poster prop as a background image, rendering only the necessary HTML', () => {
    const cardFront = shallow(<CardFront poster="you spin me right round"/>)
    expect(cardFront.html()).to.equal('<div class="card-front" style="background-image:url(you spin me right round)"></div>')
  })

})
