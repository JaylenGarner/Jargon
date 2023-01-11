
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
        <br></br>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <LogoutButton />
    </nav>
  );
}

export default NavBar;
