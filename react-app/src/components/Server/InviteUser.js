import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addUserThunk, loadServersThunk } from '../../store/server';
import './InviteUser.css'


const InviteUser = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {serverId} = useParams()
    const history = useHistory()

    const handleSubmit = async (e) => {
      return dispatch(addUserThunk(serverId, username))
      .then(history.push(`/servers/${serverId}`))
      .then(dispatch(loadServersThunk(user.id)))
    }

    const updateUsername = (e) => {
      setUsername(e.target.value);
    };

    return (
      <form onSubmit={handleSubmit} className="invite-user-form-container">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <p className='invite-user-header' >Invite user</p>
          <p className='invite-user-intro'>
            Invite a user to the server!
          </p>
          <input
            className='invite-user-input'
            name='invite'
            type='text'
            placeholder='Enter a username'
            value={username}
            onChange={updateUsername}
            required
          />
        </div>
        <div className='invite-user-button-container'>
          <button type='submit' className='invite-user-button'>Invite</button>
        </div>
      </form>
    );
  };

  export default InviteUser;
