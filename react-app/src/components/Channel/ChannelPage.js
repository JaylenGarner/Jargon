import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServerThunk } from '../../store/server';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { loadChannelThunk } from '../../store/channel';
import { useEffect } from 'react';
import { deleteChannelThunk } from '../../store/channel';
import './Channel.css';


const ChannelPage = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams()
    const user = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels)
    const history = useHistory()
    const refresh = () => window.location.reload(true)

    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))
    let resServer;

    const handleDelete = () => {
         return dispatch(deleteChannelThunk(channelId))
        .then(history.push(`/servers/${serverId}`))
        .then(refresh())
    }

    for (let i = 0; i < servers.length; i++) {
        let innerServers = servers[i]

        innerServers.forEach((server) => {
            serversArr.push(server)
            if (server.id == serverId) resServer = server
        });
    }

    useEffect(() => {
        dispatch(loadChannelThunk(channelId))
    }, [dispatch, channelId]);


    if (!channel) {
        return null
    } else if (!resServer) {
        return null
    } else {
        return (
            <div className='channel-page-container'>
                <div>
                    <div className='channel-name-header-container'>
                        <span className='channel-name-header-hashtag'>#   </span>
                        <span className='channel-name-header'>{channel.name}</span>
                    </div>
                    <h2 className='channel-welcome-area-header'>Welcome to #{channel.name}!</h2>
                    <span className='channel-welcome-area-notification'>This is the start of the #{channel.name} channel.</span>

                <div className='channel-permissions-container'>
                {(user.id == resServer.owner_id) &&
                    <div>
                        <NavLink to={`/servers/${serverId}/channels/${channelId}/edit-channel`} exact={true} activeClassName='active'>
                            <button className='channel-permission-buttons'>Edit Channel</button>
                        </NavLink>
                        <button onClick={handleDelete} className='channel-permission-buttons'>Delete Channel</button>
                    </div>}
                </div>

                </div>
                <div className='channel-messages-container'>

                { channel.messages && channel.messages.map((message) => {
                    return (
                        <div className='channel-message'>
                            <div className='channel-message-user-image-container'>
                            <img src={message.user.image} className='channel-message-user-image'></img>
                            </div>

                            <br></br>
                            <div className='message-content-container'>
                            <h3>{message.user.username}</h3>
                            <span className='message-body'>{message.body}</span>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}


export default ChannelPage;
