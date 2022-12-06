import React from 'react'
import './styles.css'
import {TbLetterP,TbCloud, TbDotsVertical} from 'react-icons/tb'
import {FiClock,FiArrowDownLeft} from 'react-icons/fi'
import {FaUserCircle} from 'react-icons/fa';
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import { TbMinusVertical } from 'react-icons/tb'

const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-box'>
        <div >
          <span className='p-tag'><TbLetterP fontSize="1em"/></span><TbMinusVertical/>
          <span  style={{paddingRight:'5px'}}><FiClock>10mins</FiClock></span><TbMinusVertical/>
          <FaUserCircle style={{ color:'red'}}/> <TbMinusVertical/>
          <FiArrowDownLeft/>
        </div>
        <div>
          <span><IoMdCheckmarkCircleOutline style={{paddingRight:'3px'}}/></span>
          <span><TbCloud style={{paddingRight:'3px', color: 'green'}}/></span>
          <span><TbDotsVertical/></span>
        </div>
      </div>
      <div>
        <h2 className='header-text'>Front End Developer Test Project</h2>
        <hr/>
        <p className='header-para'>Your goal is to make a page that looks exactly like this one , and the ability to create H1 text simply by typing / then 1, then typing text and hitting enter</p>
      </div>
    </div>
  )
}

export default Header