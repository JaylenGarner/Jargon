import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServerThunk } from '../../store/server';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { loadChannelThunk } from '../../store/channel';
import { useEffect } from 'react';


const ChannelPage = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams()
    const user = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels)
    console.log(channel)
    // const history = useHistory()
    // const refresh = () => window.location.reload(true)

    // const handleDelete = () => {
    //      dispatch(deleteServerThunk(serverId)).then(refresh())
    //      return <Redirect to='/' />;
    // }


    useEffect(() => {
        dispatch(loadChannelThunk(channelId))
    }, [dispatch]);


    if (!channel) {
        return null
    } else {
        return (<h1>{channel.name}</h1>)
    }
}


export default ChannelPage;
