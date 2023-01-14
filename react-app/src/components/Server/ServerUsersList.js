import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ServerUsersList() {
  const [users, setUsers] = useState([]);
  const {serverId} = useParams()
  const serversArr = []
  const servers = Object.values(useSelector((state) => state.servers))
  let resServer;
  let usersArr;


  for (let i = 0; i < servers.length; i++) {
    let innerServers = servers[i]

    innerServers.forEach((server) => {
        serversArr.push(server)
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
                <span>👑 </span>

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
    <>
      <h1>Members</h1>
      <div>{userComponents}</div>
    </>
  );
  } else {
    return null
  }
}

export default ServerUsersList;
