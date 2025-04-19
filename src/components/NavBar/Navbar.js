import React from 'react'
import './styles.css'
import { FaAngleDoubleRight, FaAngleDown, FaLock } from 'react-icons/fa'
import { TbMinusVertical } from 'react-icons/tb'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="left-content">
          <FaAngleDoubleRight className="icon arrow" />
          <div className="left-nav">
            <span className="nav-link">Main</span> /
            <span className="nav-link">Getting Started</span> /
            <span className="nav-link">Front-end developer test proje...</span>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="right-content">
          <FaLock className="icon lock" />
          <span className="navright-link">Editing</span>
          <TbMinusVertical className="icon divider" />
          <span className="navright-link publish">Publish Space</span>
          <FaAngleDown className="icon dropdown" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
