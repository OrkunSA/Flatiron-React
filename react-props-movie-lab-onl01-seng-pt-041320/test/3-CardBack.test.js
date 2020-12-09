import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import CardBack from '../src/card-components/CardBack'


describe('<CardBack />', () => {
  
  const genres = [
    "Never gonna give you up",
    "Never gonna let you down",
    "Never gonna run around and desert you"
  ]
  
  const cardBack = shallow(<CardBack title="Rolling in the Deep" genres={genres} IMDBRating={3} />)
  const text = cardBack.text()
  
  it("correctly renders the title prop", () => {
    expect(text).to.contain('Rolling in the Deep')
  })
  
  it("correctly renders the genres prop as comma seperated strings", () => {
    expect(text).to.contain(genres.join(', '))
  })
  
  it("renders 'No Rating Found' in an <h4> if the IMDBRating prop is null", () => {
    const nullRating = shallow(<CardBack title="Rolling in the Deep" genres={['s']} IMDBRating={null} />)
    expect(nullRating.find('h4').text().toLowerCase()).to.equal('no rating found')
  })
  
  it("renders an <img> tag if the IMDBRating prop is valid", () => {
    expect(cardBack.find('img').exists()).to.equal(true)
  })
  
})
