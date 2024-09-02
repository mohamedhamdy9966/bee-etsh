import React from 'react'
import './Navbar.css'
import logo  from "../../assets/images/logo.png";
import admin from "../../assets/images/admin.jpeg";

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="logo" className='nav-logo'/>
      <img src={admin} alt="logo1" className='nav-profile'/>
    </div>
  )
}

export default Navbar
