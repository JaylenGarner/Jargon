import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addUserThunk } from '../../store/server';


const MessageUserForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {serverId} = useParams()
    const history = useHistory()

    const refresh = () => window.location.reload(true)

    const handleSubmit = async (e) => {
      return dispatch(addUserThunk(serverId, username))
      .then(history.push(`/direct-messages/${serverId}`))
      .then(refresh())
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
          <p >Direct message a user</p>
          <input
            name='invite'
            type='text'
            placeholder='Enter a username'
            value={username}
            onChange={updateUsername}
            required
          />
        </div>
        <div >
          <button type='submit'>Start conversation</button>
        </div>
      </form>
    );
  };

  export default MessageUserForm;
