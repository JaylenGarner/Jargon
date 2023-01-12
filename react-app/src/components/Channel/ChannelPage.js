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

    console.log(resServer)

    if (!channel) {
        return null
    } else if (!resServer) {
        return null
    } else {
        return (
            <div>
                <div>
                <h1>{channel.name}</h1>

                {(user.id == resServer.owner_id) &&
                <div>
                <NavLink to={`/servers/${serverId}/channels/${channelId}/edit-channel`} exact={true} activeClassName='active'>
                <button>Edit Channel</button>
                </NavLink>
                <button onClick={handleDelete}>Delete Channel</button>
                </div>}

                <br></br>
                <br></br>
                <br></br>
                </div>
                <h2>***Messages area***</h2>
            </div>
        )
    }
}


export default ChannelPage;
