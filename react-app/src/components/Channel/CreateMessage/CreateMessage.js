import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessageThunk } from '../../../store/message';
import { useParams } from 'react-router-dom';
import './CreateMessage.css'
import { loadChannelThunk } from '../../../store/channel';

// TO DO
// REDIRECT TO NEWLY CREATED CHANNEL
const CreateMessage = ({channelName}) => {
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {channelId} = useParams();
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      return dispatch(createMessageThunk(channelId, body))
      .then(dispatch(loadChannelThunk(channelId)))
    };

    const updateBody = (e) => {
      setBody(e.target.value);
    };

    return (
      <form onSubmit={handleSubmit} className='create-message-container'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='add-media-button'>+</div>
        <div>
          <label htmlFor='body'></label>
          <input
            className='create-message-input'
            name='body'
            type='text'
            placeholder={`MESSAGE #${channelName}`}
            value={body}
            onChange={updateBody}
            required
          />
        </div>
        <div>
          <button type='submit' onSubmit={handleSubmit} className='create-message-button'>Send</button>
        </div>
      </form>
    );
  };

  export default CreateMessage;
