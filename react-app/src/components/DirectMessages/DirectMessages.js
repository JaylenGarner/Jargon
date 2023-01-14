import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../../store/server'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const DirectMessages = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const directMessageServs = []
  const servers = Object.values(useSelector((state) => state.servers))
  let firstChannel;

  if (!user) {
    history.push(`/login`)
  }

  if (servers) {
  for (let i = 0; i < servers.length; i++) {
      let innerServers = servers[i]

      innerServers.forEach((server) => {
        if (server.public === false) {
          directMessageServs.push(server)
        }
      });
  }
}

console.log(directMessageServs)
  return (
    <div>
      {directMessageServs.map((server) => {

          if (server) {
            if (server.channels) {
              firstChannel = server.channels[0]
            }

            return (
              <div key={server.id} className='nav-server-logo-container'>
                {firstChannel &&
                <NavLink to={`/direct-messages/${server.id}`} exact={true} activeClassName='active'>
                  <img src={server.image} className='nav-server-logo'></img>
                </NavLink>}
                <h1>{server.name}</h1>
              </div>
            )
          }
      })}
  </div>
);
  }

export default DirectMessages;