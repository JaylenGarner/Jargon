import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { loadChannelThunk } from '../../store/channel';
import { useEffect } from 'react';
import { deleteChannelThunk } from '../../store/channel';
import { loadServersThunk } from '../../store/server';
import CreateMessage from './CreateMessage/CreateMessage';
import { deleteServerThunk } from '../../store/server';
import './Channel.css';


const ChannelPage = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams()
    const user = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channel)
    const history = useHistory()
    const servers = Object.values(useSelector((state) => state.servers))
    let resServer;

    const reloadServer = () => {
        setTimeout(() => {
          dispatch(loadServersThunk(user.id))
        }, 1500)
      }


        servers.forEach((server) => {
            if (server.id == serverId) resServer = server
        });

        const handleDelete = () => {
            return dispatch(deleteChannelThunk(channelId))
            .then(dispatch(loadServersThunk(user.id)))
           .then(history.push(`/servers/${serverId}`))
           .then(() => {
                if (resServer.channels.length <= 1) {
                    dispatch(deleteServerThunk(resServer.id))
                    .then(history.push('/'))
                } else {
                    history.push(`/servers/${serverId}`)
                    reloadServer()
                }
           })
       }

    useEffect(() => {
        if (channel) {
        dispatch(loadChannelThunk(channelId))
        }
    }, [dispatch, channelId, resServer]);

    if (!channel) {
        return null
    } else if (!resServer) {
        return null
    } else if (!resServer.public) {
        return (
            <div className='channel-page-container'>
                <div>
                    <div className='channel-name-header-container'>
                        <span className='channel-name-header-hashtag'>#   </span>
                        <span className='channel-name-header'>Direct Messages</span>
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
                            <h3 className='message-username'>{message.user.username}</h3>
                            <span className='message-body'>{message.body}</span>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div >
                    <CreateMessage channelName={channel.name}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className='channel-page-container'>
                <div>
                    <div className='channel-header-container'>
                        <div>
                        <span className='channel-name-header-hashtag'>#   </span>
                        <span className='channel-name-header'>{channel.name}</span>
                        </div>
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
                <div>
                    <CreateMessage channelName={channel.name}/>
                </div>
            </div>
        )
    }
}


export default ChannelPage;
