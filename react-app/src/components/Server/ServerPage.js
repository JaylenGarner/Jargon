import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServerThunk } from '../../store/server';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CreateChannelForm from '../Channel/CreateChannel';
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
                <h1>{resServer.name}</h1>
                    </div>
                <h2>Channels</h2>
                 {resServer.channels.map((channel) => {
                        if (!channel) {
                            return null
                        } else {
                            return (
                                <div key={channel.id}>
                                    <NavLink to={`/servers/${serverId}/channels/${channel.id}`} exact={true} activeClassName='active'>
                                        <h3>{channel.name}</h3>
                                    </NavLink>
                                </div>
                            )
                        }
                    })}
                </div>
                <br></br>
                <div>
                <NavLink to={`/servers/${serverId}/create-channel`} exact={true} activeClassName='active'>
                    <button>Create Channel</button>
                </NavLink>
                <br></br>
                <br></br>
                <NavLink to={`/servers/${serverId}/edit-server`} exact={true} activeClassName='active'>
                    <button>Edit Server</button>
                </NavLink>
                    <br></br>
                    <br></br>
                    <button onClick={handleDelete}>Delete Server</button>
                </div>
            </nav>)
        }
    }


export default ServerPage;
