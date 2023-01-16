import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createDirectMessageThunk } from '../../store/server';
import { loadServersThunk } from '../../store/server';
import './MessageUserForm.css'


const MessageUserForm = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const user = useSelector(state => state.session.user);
    const servers = Object.values(useSelector((state) => state.servers))
    const dispatch = useDispatch();
    const history = useHistory()


    useEffect(() => {
      // dispatch(loadChannelThunk(channelId))
    }, [dispatch, error])


      const handleSubmit = async (e) => {
      e.preventDefault()

        const data = await dispatch(createDirectMessageThunk(username));
        if (!data.ok) {
          setError("Conversation already exists or User doesn't exist")
        } else {
          setError(null)
          console.log(data.JSON)
        }
      }

    const updateUsername = (e) => {
      setUsername(e.target.value);
    };


    return (
      <form onSubmit={handleSubmit} className="dm-user-form-container">
        <div>

        {/* {errors && errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))} */}
        {(error !== null) && <h1 className='dm-user-error'>{error}</h1>}
        </div>
        <div>
          <p className='dm-user-header'>Direct message a user</p>
          <p className='dm-user-intro'>
            Start a conversation!
          </p>
          <input
            className='dm-user-input'
            name='invite'
            type='text'
            placeholder='Enter a username'
            value={username}
            onChange={updateUsername}
            required
          />
        </div>
        <div className='dm-user-button-container'>
          <button type='submit' className='dm-user-button'>Start conversation</button>
        </div>
      </form>
    );
  }

  export default MessageUserForm;
