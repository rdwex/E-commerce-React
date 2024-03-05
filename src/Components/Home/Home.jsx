import React from 'react'
import Sliders from '../Sliders/Sliders'
import Categories from '../Categories/Categories'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
  return (
    <>
      <Sliders />
      <CategorySlider />
      <Products />
    </>
  )
}
