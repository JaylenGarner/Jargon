import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../store/server'
import { NavLink } from 'react-router-dom';
// import CSS File when created

function NavServers() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))

    for (let i = 0; i < servers.length; i++) {
        let innerServers = servers[i]

        innerServers.forEach((server) => {
            serversArr.push(server)
        });
    }



    // console.log(serversArr, 'RJPGIRJNGVR')

    useEffect(() => {
       dispatch(loadServersThunk(user.id));
    }, [dispatch]);

return (
      <div>
        <h1>Servers</h1>
        {serversArr.map((server) => {
            // console.log(server[0].id)
            // console.log(server)
            return <div key={server.id}>{server.name}</div>
        })}
    </div>
  );
}

export default NavServers;
