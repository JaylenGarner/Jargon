import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServerThunk } from '../../store/server';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Server.css';

// TO DO
// NEEDS TO REDIRECT HOME UPON DELETING A SERVER
// WHEN OPENING A SERVER, AUTOMATICALLY OPEN GENERAL CHANNEL

const ServerPage = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams()
    const user = useSelector((state) => state.session.user)
    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))
    const history = useHistory()
    let resServer;

    const refresh = () => window.location.reload(true)

    const handleDelete = () => {
         dispatch(deleteServerThunk(serverId)).then(refresh())
         return dispatch(deleteServerThunk(serverId))
        .then(history.push(`/`))
        .then(refresh())
    }

    for (let i = 0; i < servers.length; i++) {
        let innerServers = servers[i]

        innerServers.forEach((server) => {
            serversArr.push(server)
            if (server.id == serverId) resServer = server
        });
    }

    if (!resServer) {
        return null
    } else {
        return (
            <nav className='server-page-nav'>
                <div>
                    <div className='server-name-container'>
                <span>{resServer.name}</span>
                    </div>
                    <div className='text-channels-header-container'>
                        <span className='text-channels-header'>CHANNELS</span>
                        {(resServer.owner_id == user.id) &&
                        <NavLink to={`/servers/${serverId}/create-channel`} exact={true} activeClassName='active'>
                            <button className='create-channel-button'>+</button>
                        </NavLink>}

                    </div>
                 {resServer.channels.map((channel) => {
                        if (!channel) {
                            return null
                        } else {
                            return (
                                <div className='server-channel-name-header-container' key={channel.id}>
                                    <NavLink to={`/servers/${serverId}/channels/${channel.id}`} exact={true} activeClassName='active'>
                                        <button className='server-channel-name-header'># {channel.name}</button>
                                    </NavLink>
                                </div>
                            )
                        }
                    })}
                </div>
                <br></br>
                    {(resServer.owner_id == user.id) &&
                    <div>
                <br></br>
                <br></br>
                <NavLink to={`/servers/${serverId}/edit-server`} exact={true} activeClassName='active'>
                    <button>Edit Server</button>
                </NavLink>
                    <br></br>
                    <br></br>
                    <button onClick={handleDelete}>Delete Server</button>
                </div>
                }
            </nav>)
        }
    }


export default ServerPage;
