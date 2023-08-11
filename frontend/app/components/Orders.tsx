import React from 'react'

const Orders = () => {
  return (
    <div className='flex py-5 gap-3 md:gap-5 border-b'>

            <div className="shrink-0 aspect-square w-[100px] md:w-[250px]">
                <img src="/img1.png" alt="" />
            </div>

             
            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        Jorden retro 5g
                    </div>
                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        Men&apos s Golf shoes
                    </div>
                </div>

                <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                    Men&apos s Golf shoes
                </div>

                


            </div>

        </div>
  )
}

export default Orders