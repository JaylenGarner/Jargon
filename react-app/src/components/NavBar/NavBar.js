
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import NavServers from './NavServers';
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user)

  if (!user) {
    return <nav className='hide-nav-bar'></nav>
  } else {
  return (
    <nav className='nav-bar'>
        <div className='jargon-logo-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='https://jargon-app-images.s3.amazonaws.com/jargon-image.jpeg' className='discord-logo'></img>
          </NavLink>
        </div>
        <NavServers />
        <NavLink to='/create-server' exact={true} activeClassName='active'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJw0vLOOSkBPLlJbxN8DIvbx45WiIe0OYKmH-rBalLz9ueOgyJcos2FsWgIPzffz3Gu3o&usqp=CAU' className='create-server-logo'></img>
        </NavLink>
        <br></br>
        <LogoutButton />
    </nav>
  );
  }
}

export default NavBar;
