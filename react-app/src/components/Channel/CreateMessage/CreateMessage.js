import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessageThunk } from '../../../store/message';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './CreateMessage.css'
import { loadChannelThunk } from '../../../store/channel';
import { loadServersThunk } from '../../../store/server';

// TO DO
// REDIRECT TO NEWLY CREATED CHANNEL
const CreateMessage = ({channelName, type}) => {
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {channelId} = useParams()
    const history = useHistory()

    const reloadChannel = () => {
        dispatch(loadChannelThunk(channelId))
    }

    const handleSubmit = async (e) => {
      if (user) {
      e.preventDefault()
      const data = await dispatch(createMessageThunk(channelId, body))
      .then(reloadChannel())
      setBody('')
      return data
      }
    };

    const updateBody = (e) => {
      setBody(e.target.value);
    };

    useEffect(() => {
      // dispatch(loadChannelThunk(channelId))
    }, [dispatch, channelId])

    return (
      <div className='create-message-form-container'>
      <form onSubmit={handleSubmit} className='create-message-container'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        {}
        <div className={`create-message-form-container-${type}`}>
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
          {/* <button type='submit' onSubmit={handleSubmit} className='create-message-button'>Send</button> */}
        </div>
      </form>
      </div>
    );
  };

  export default CreateMessage;
