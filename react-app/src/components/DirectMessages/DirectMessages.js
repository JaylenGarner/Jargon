import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../../store/server'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './DirectMessages.css'



const DirectMessages = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const directMessageServs = []
  let otherUser;
  const servers = Object.values(useSelector((state) => state.servers))
  let firstChannel;

  if (!user) {
    history.push(`/login`)
  }

  // if (servers) {
//   for (let i = 0; i < servers.length; i++) {
//       let innerServers = servers[i]

//       innerServers.forEach((server) => {
//         if (server.public === false) {
//           directMessageServs.push(server)
//         }
//       });
//   }
// }

  const getOtherUser = (server) => {
    server.users.forEach((el) => {
      if (el.id !== user.id) otherUser = el;
    })
  }


  return (

    <nav className='dm-page-nav'>
      <div className='dms-header-container'>
        {user && <span className='dms-header'>Direct Messages</span>}
      </div>
      {user &&
      <div>
      {directMessageServs.map((server) => {

          if (server) {
            getOtherUser(server)

            if (server.channels) {
              firstChannel = server.channels[0]
            }

            return (
              <div key={server.id} className='nav-server-logo-container'>
                {firstChannel &&
                <NavLink to={`/direct-messages/${server.id}/${firstChannel.id}`} exact={true} activeClassName='active'>
                <img src={otherUser.image} className='dm-user-image'></img>
                <h1>{otherUser.username}</h1>
                </NavLink>}
               </div>
            )
          }
      })}

      <NavLink to={`/direct-messages/invite`} exact={true} activeClassName='active'>
        <button>Message a user</button>
      </NavLink>
  </div>
      }
    </nav>
  )

}

export default DirectMessages;
