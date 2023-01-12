import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../../store/server'
import { NavLink } from 'react-router-dom';
// import CSS File when created

function NavServers() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))
    let firstChannel;

    for (let i = 0; i < servers.length; i++) {
        let innerServers = servers[i]

        innerServers.forEach((server) => {
            serversArr.push(server)
        });
    }

    useEffect(() => {
       dispatch(loadServersThunk(user.id));
    }, [dispatch]);

return (
      <div>
        {serversArr.map((server) => {
            if (server.public) {
              if (server.channels) {
                firstChannel = server.channels[0]
              }

              return (
                <div key={server.id} className='nav-server-logo-container'>
                  <NavLink to={`/servers/${server.id}/channels/${firstChannel.id}`} exact={true} activeClassName='active'>
                    <img src={server.image} className='nav-server-logo'></img>
                  </NavLink>
                </div>
              )
            }
        })}
    </div>
  );
}

export default NavServers;
