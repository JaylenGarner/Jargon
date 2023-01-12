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

    const handleDelete = () => {
        //  dispatch(deleteChannelThunk(channelId)).then(refresh())
         return dispatch(deleteChannelThunk(channelId))
        .then(history.push(`/servers/${serverId}`))
        .then(refresh())
    }


    useEffect(() => {
        dispatch(loadChannelThunk(channelId))
    }, [dispatch, channelId]);

    if (!channel) {
        return null
    } else {
        return (
            <div>
                <h1>{channel.name}</h1>
                <NavLink to={`/servers/${serverId}/channels/${channelId}/edit-channel`} exact={true} activeClassName='active'>
                <button>Edit Channel</button>
                </NavLink>
                <button onClick={handleDelete}>Delete Channel</button>
                <br></br>
                <br></br>
                <br></br>
                <h2>***Messages area***</h2>
            </div>
        )
    }
}


export default ChannelPage;
