import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { createChannelThunk } from '../../store/channel';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './CreateChannel.css'

// TO DO
// REDIRECT TO NEWLY CREATED CHANNEL
const CreateChannelForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {serverId} = useParams()
    const history = useHistory()

    const refresh = () => window.location.reload(true)

    const handleSubmit = async (e) => {
      // e.preventDefault();
      // const data = await dispatch(createChannelThunk(serverId, name));
      return dispatch(createChannelThunk(serverId, name))
      .then(history.push(`/servers/${serverId}`))
      .then(refresh())

      // if (data) {
      //   setErrors(data);
      //   return <Redirect to='/' />;
      // }
    };

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
