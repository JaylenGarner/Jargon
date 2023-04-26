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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(createChannelThunk(serverId, name))
      // .then(reloadServer())
      history.push(`/servers/${serverId}/channels/${channel.id}`)
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
        <div>
          <button type='submit' className='channel-form-button'>Create Channel</button>
        </div>
      </form>
    );
  };

  export default CreateChannelForm;
