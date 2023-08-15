import React from 'react'
import ProductCard from '../components/ProductCard'
const page = () => {
  return (
    <div>

    <div className='flex flex-row justify-between m-8'>
      <div>
        <ProductCard/>
      </div>
      <div>
        <ProductCard/>
      </div>
      <div>
        <ProductCard/>
      </div>
      <div>
        <ProductCard/>
      </div>
    </div>
    </div>
  )
}

export default page