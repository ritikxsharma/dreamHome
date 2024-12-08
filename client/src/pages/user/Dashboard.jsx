import React from 'react'
import Tabs from '../../components/navigation/Tabs'

const Dashboard = () => {
  return (
    <div>
        <h1 className='display-1 bg-primary text-light p-5'>
            User Dashboard
        </h1>
        <Tabs />
    </div>
  )
}

export default Dashboard