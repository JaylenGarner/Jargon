import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../store/server'
import { NavLink } from 'react-router-dom';
// import CSS File when created

function NavServers() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const servers = useSelector((state) => state.servers)
    const serversArr = Object.values(servers)
    console.log(serversArr)

    useEffect(() => {
      dispatch(loadServersThunk(sessionUser.id));
    }, [dispatch]);


}

const Servers = () => {
  return (
    <div>
      <h1>Servers</h1>
        {/* {serversArr.map((server) => {
            return <h1>{server.name}</h1>
        })} */}
{/*
        <NavLink to='/' exact={true} activeClassName='active'>
            Server1
        </NavLink>
        <br></br>
        <NavLink to='/' exact={true} activeClassName='active'>
          Server2
        </NavLink> */}

    </div>
  );
}

export default Servers;
