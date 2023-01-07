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


    useEffect(() => {
       dispatch(loadServersThunk(user.id));
    }, [dispatch]);

return (
      <div>
        <h1>Servers</h1>
        {serversArr.map((server) => {
            if (server.public) {
              return (
                <div key={server.id}>
                    <img src={server.image}></img>
                    <span>{server.name}</span>
                </div>
              )
            }
        })}
    </div>
  );
}

export default NavServers;
