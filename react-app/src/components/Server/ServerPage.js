import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServerThunk, loadServersThunk } from '../../store/server';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import ChannelPage from '../Channel/ChannelPage';
import InviteUser from './InviteUser';
import './Server.css';

const ServerPage = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams()
    const user = useSelector((state) => state.session.user)
    const servers = Object.values(useSelector((state) => state.servers))
    const history = useHistory()
    let resServer;
    let firstChannel;

    const handleDelete = (serverId) => {
        dispatch(deleteServerThunk(serverId))
        history.push("/");
    }

    useEffect(() => {
        dispatch(loadServersThunk(serverId))
    }, [dispatch])

        servers.forEach((server) => {
            if (server.id == serverId) resServer = server
        });

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
                                <div key={channel.id} >
                                    <NavLink to={`/servers/${serverId}/channels/${channel.id}`} exact={true} activeClassName='active'>
                                        <div className='server-channel-name-header-container'>
                                        <button className='server-channel-name-header'># {channel.name}</button>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        }
                    })}
                </div>
                <br></br>
                    {(resServer.owner_id == user.id) &&
                    <div className='server-buttons-container'>
                        <NavLink to={`/servers/${serverId}/invite`} exact={true} >
                        <button className='server-admin-button'>Add User</button>
                        </NavLink>
                <br></br>
                <NavLink to={`/servers/${serverId}/edit-server`} exact={true} >
                    <button className='server-admin-button'>Edit Server</button>
                </NavLink>
                    <br></br>
                    <button onClick={() => handleDelete(serverId)} className='server-admin-button delete-button'>Delete Server</button>
                </div>
                }
            </nav>
        )
        }
    }


export default ServerPage;
