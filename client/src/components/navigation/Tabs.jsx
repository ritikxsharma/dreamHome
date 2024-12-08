import React from 'react'
import { NavLink } from 'react-router-dom'

const Tabs = () => {
  return (
    <>
        <ul className='nav nav-tabs'>
            <li className="nav-items">
                <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-items">
                <NavLink className="nav-link" to="/ad/create">
                    Create Ad
                </NavLink>
            </li>
        </ul>
    </>
  )
}

export default Tabs