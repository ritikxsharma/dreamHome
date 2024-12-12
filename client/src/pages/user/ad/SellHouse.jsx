import React from 'react'
import AdForm from '../../../components/forms/AdForm'
import Tabs from '../../../components/navigation/Tabs'

const SellHouse = () => {
  return (
    <>
        <div>
            <h1 className='display-1 bg-primary text-light p-5'>
                Sell House
            </h1>
            <Tabs />
            <div className='contaioner mt-2'>
                <AdForm action="sell" type="house"/>
            </div>
        </div>
    </>
  )
}

export default SellHouse