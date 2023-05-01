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
    const [users, setUsers] = useState([]);
    let convoExists = false

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch, error, username]);



      const handleSubmit = async (e) => {
      e.preventDefault()

      if (user && username) {
        if (servers) {
          Object.values(servers).forEach((el) => {
            console.log(el.name)
            if (el.name === `${user.username}-${username}` || (el.name === `${username}-${user.username}`)) {
              convoExists = true
            }
          })
        }
      }


      if (convoExists === true) {
        setError("Conversation already exists")
        setUsername('')
      } else {
        const data = await dispatch(createDirectMessageThunk(username));
        let usernames = []
          users.forEach((el) => {
              usernames.push(el.username)
          })


          if (!usernames.includes(username)) {
          setError("User does not exist")
          setUsername('')
        } else if (username === user.username) {
         setError('You cannot message yourself')
         setUsername('')
         } else if (!data.ok) {
          setError("Conversation already exists")
          setUsername('')
         } else {
          setError(null)
          setUsername('')
        }
      }
      }


    const updateUsername = (e) => {
      setUsername(e.target.value);
    };


    return (
      <form onSubmit={handleSubmit} className="dm-user-form-container">
        <div>

        {(error !== null) && <span className='dm-user-error'>{error}</span>}
        </div>
        <div>
          <span className='dm-user-header'>Direct message a user</span>
          <span className='dm-user-intro'>
          Utilize user 'jay' for demo purposes
          </span>
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
