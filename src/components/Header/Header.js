import React from 'react'
import './styles.css'
import {TbLetterP,TbCloud, TbDotsVertical} from 'react-icons/tb'
import {FiClock,FiArrowDownLeft} from 'react-icons/fi'
import {FaUserCircle} from 'react-icons/fa';
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import { TbMinusVertical } from 'react-icons/tb'
import { MdTimer10 } from 'react-icons/md'
const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-box'>
        <div >
          <span className='p-tag'>
            <TbLetterP fontSize="20px"/>
          </span>
          <TbMinusVertical style={{color: 'grey',fontSize: "20px"}}/>
          <span style={{paddingRight:'5px'}}>
            <FiClock fontSize="20px"/>
          </span>
          <span>
            <MdTimer10 fontSize="20px"/>
          </span>
          <TbMinusVertical style={{color: 'grey',fontSize: "20px"}}/>
          <FaUserCircle style={{ color:'red', fontSize:"20px"}}/><TbMinusVertical style={{color: 'grey', fontSize: "20px"}}/>
          <FiArrowDownLeft fontSize="20px"/>
        </div>
        <div>
          <span><IoMdCheckmarkCircleOutline style={{paddingRight:'15px', fontSize: '20px'}}/></span>
          <span><TbCloud style={{paddingRight:'15px', color: 'green', fontSize: '20px'}}/></span>
          <span><TbDotsVertical style={{fontSize: '20px'}}/></span>
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