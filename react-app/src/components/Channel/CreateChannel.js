import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { createChannelThunk } from '../../store/channel';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { loadServersThunk } from '../../store/server';
import { useEffect } from 'react';
import './CreateChannel.css'

// TO DO
// REDIRECT TO NEWLY CREATED CHANNEL
const CreateChannelForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const user = useSelector(state => state.session.user);
    const channel = useSelector(state => state.channel);
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams()
    const history = useHistory()
    let resChannel;

    const reloadServer = () => {
      setTimeout(() => {
        dispatch(loadServersThunk(user.id))
      }, 1500)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(createChannelThunk(serverId, name))
      .then(reloadServer())
      // history.push(`/servers/${serverId}/channels/${resChannel.id}`)
      return data
    };

    useEffect(() => {
      dispatch(loadServersThunk(user.id))
    }, [dispatch, channelId])

    const updateName = (e) => {
      setName(e.target.value);
    };

    return (
      <form onSubmit={handleSubmit} className="create-channel-form-container">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <h1 className='create-channel-header'>Create a channel</h1>
          <p className='create-channel-intro'>
            Send messages, images, GIFs, emoji, opinions, and puns
          </p>
          <p className='create-channel-name'>CHANNEL NAME</p>
          <input
            className='create-channel-name-input'
            name='name'
            type='text'
            placeholder='Enter your channel name'
            value={name}
            onChange={updateName}
            required
          />
        </div>
        <div className='create-channel-button-2-container'>
          <button type='submit' className='create-channel-button-2'>Create Channel</button>
        </div>
      </form>
    );
  };

  export default CreateChannelForm;
