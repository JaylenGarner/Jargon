import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ServersUsersList.css';


function ServerUsersList() {
  const [users, setUsers] = useState([]);
  const {serverId} = useParams()
  const servers = Object.values(useSelector((state) => state.servers))
  let resServer;
  let usersArr;


  for (let i = 0; i < servers.length; i++) {
    let innerServers = servers[i]

    servers.forEach((server) => {
        if (server.id == serverId) {
            usersArr = server.users
            resServer= server
        }
    });
}

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

//   if (!resServer) {
//     return null

  if (usersArr) {
  const userComponents = usersArr.map((user) => {

    if (user.id === resServer.owner_id) {
        return (
            <div>
                <span>👑 &nbsp;</span>

        {/* <img src={user.image}></img> */}
                <span>{user.username}</span>
            </div>
        )
    } else {
        return (
            <div>

            {/* <img src={user.image}></img> */}
            <span>{user.username}</span>
            </div>
        )
    }

});

  return (
    // <div className='server-page-nav-container'>
    <nav className='server-users-nav'>
      <div className='server-users-nav-content'>
      <span className='server-nav-header'>Members</span>
      <div className='server-nav-users-container'>{userComponents}</div>
      </div>
      </nav>
  );
  } else {
    return null
  }
}

export default ServerUsersList;
