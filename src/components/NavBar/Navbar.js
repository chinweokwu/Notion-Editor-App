import React from 'react'
import './styles.css';
import { FaAngleDoubleRight, FaAngleDown, FaLock, } from "react-icons/fa";
import { TbMinusVertical } from 'react-icons/tb'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className='navbar-left'>
        <div className="left-content">
          <div>
            <FaAngleDoubleRight fontSize="1em" color='grey' /> 
          </div>
          <div className='left-nav'>
            <span className='nav-link'>Main</span>/
            <span className='nav-link'>Getting Started</span>/
            <span className='nav-link'>Front-end developer test proje...</span>
          </div>
        </div>
      </div>
      <div className='navbar-right'>
        <div className='left-nav'>
          <FaLock 
            style={{position: 'absolute', right: '228', top: '24'}}/>
          <span className='navleft-link'>Editing</span> 
          <TbMinusVertical style={{position: 'absolute',fontSize: '24px',top: '20',right: '144',color: 'lightgrey'}}/>
          <span className='navleft-link publish'>Publish Space</span>
          <FaAngleDown style={{position: 'absolute',right:'31', color: 'blue'}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
