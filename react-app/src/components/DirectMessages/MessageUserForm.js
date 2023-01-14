import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createDirectMessageThunk } from '../../store/server';
import { loadServersThunk } from '../../store/server';


const MessageUserForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const user = useSelector(state => state.session.user);
    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))
    const dispatch = useDispatch();
    const history = useHistory()
    const refresh = () => window.location.reload(true)

    if (servers) {
        for (let i = 0; i < servers.length; i++) {
            let innerServers = servers[i]
            innerServers.forEach((server) => {
                serversArr.push(server)
            });
        }
      }

    const handleSubmit = async (e) => {
      return dispatch(createDirectMessageThunk(username))
      .then(history.push(`/`))
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
