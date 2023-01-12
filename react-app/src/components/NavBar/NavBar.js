
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import NavServers from './NavServers';
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user)

  return (
    <nav className='nav-bar'>
        <div className='discord-logo-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='https://support.discord.com/hc/user_images/PRywUXcqg0v5DD6s7C3LyQ.jpeg' className='discord-logo'></img>
          </NavLink>
        </div>
        {user && <NavServers />}
        {user && <NavLink to='/create-server' exact={true} activeClassName='active'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJw0vLOOSkBPLlJbxN8DIvbx45WiIe0OYKmH-rBalLz9ueOgyJcos2FsWgIPzffz3Gu3o&usqp=CAU' className='create-server-logo'></img>
        </NavLink>}
        <br></br>
        {!user &&
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <br></br>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>}
        {user && <LogoutButton />}
    </nav>
  );
}

export default NavBar;
