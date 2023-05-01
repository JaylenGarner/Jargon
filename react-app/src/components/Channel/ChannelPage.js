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
import { loadMessagesThunk } from '../../store/message';


const ChannelPage = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams()
    const user = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId])
    const history = useHistory()
    const servers = Object.values(useSelector((state) => state.servers))
    const messages = Object.values(useSelector((state) => state.messages))
    let resServer;

    const firstChannel = () => {
        const first = resServer.channels[0]

        if (first.id !== channelId) {
            return first.id
        }

        return resServer.channels[1].id
    }

    useEffect(() => {
        dispatch(loadMessagesThunk(channelId))
    }, [])

    const reloadServer = () => {
          dispatch(loadServersThunk(user.id))
      }

        servers.forEach((server) => {
            if (server.id == serverId) resServer = server
        });

        const handleDelete = () => {
            dispatch(deleteChannelThunk(channelId))
            history.push(`/servers/${serverId}`)

            const first = firstChannel()

                if (resServer.channels.length > 1)  {
                    console.log('HIT 1')
                    history.push(`/servers/${serverId}/channels/${resServer.channels[1].id}`)
                    return reloadServer()
                }

                if (resServer.channels.length <= 1) {
                    console.log('HIT 2')
                   return  dispatch(deleteServerThunk(resServer.id))
                    .then(history.push('/'))
                } else {

                    console.log(first, 'FIRST')
                    history.push(`/servers/${serverId}/channels/${first}`)
                    return reloadServer()
                }
       }

    useEffect(() => {
        dispatch(loadChannelThunk(channelId))
    }, [dispatch, channelId, resServer]);

    if (!channel) {
        return <></>
    } else if (!resServer) {
        return null
    } else if (!resServer.public) {
        return (
            <div className='channel-page-container'>
                <div>
                    <div className='channel-header-container'>
                        <div>
                        <span className='channel-name-header-hashtag'>#   </span>
                        <span className='channel-name-header'>Direct Messages</span>
                        </div>
                    </div>
                </div>
                <div className='channel-messages-container-dm'>

                { messages && messages.map((message) => {
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
                    <CreateMessage channelName={channel.name} type={'dm'}/>
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
                <div className='channel-messages-container-channel'>

                <div className='channel-welcome-area-container'>
                <h2 className='channel-welcome-area-header'>Welcome to #{channel.name}!</h2>
                <span className='channel-welcome-area-notification'>This is the start of the #{channel.name} channel.</span>
                </div>

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
                    <CreateMessage channelName={channel.name} type={'channel'}/>
                </div>
            </div>
        )
    }
}


export default ChannelPage;
