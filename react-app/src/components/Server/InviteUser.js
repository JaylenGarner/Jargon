import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addUserThunk, loadServersThunk } from '../../store/server';
import './InviteUser.css'


const InviteUser = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const user = useSelector(state => state.session.user);
    const servers = Object.values(useSelector((state) => state.servers))
    const dispatch = useDispatch();
    const {serverId} = useParams()
    const history = useHistory()
    const [users, setUsers] = useState([]);
    let resServer;
    let serverMembers = []

    const reloadServer = () => {
      setTimeout(() => {
        dispatch(loadServersThunk(user.id))
      }, 1500)
    }

    servers.forEach((server) => {
      if (server.id == serverId) resServer = server
    });

    if (resServer) {
      resServer.users.forEach((el) => {
        serverMembers.push(el.username)
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      let usernames = []
          users.forEach((el) => {
              usernames.push(el.username)
          })
         if (!usernames.includes(username)) {
          setError("User does not exist")
         } else if (serverMembers.includes(username)) {
          setError("User is already a member of this server")
        } else {
          setError(null)
          const data = dispatch(addUserThunk(serverId, username))
          .then(reloadServer)
          .then(history.push(`/servers/${serverId}`))
         }
    }

    const updateUsername = (e) => {
      setUsername(e.target.value);
    };

    useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch, error, resServer]);

    return (
      <form onSubmit={handleSubmit} className="invite-user-form-container">
        {(error !== null) && <h1 className='invite-to-server-error'>{error}</h1>}
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
