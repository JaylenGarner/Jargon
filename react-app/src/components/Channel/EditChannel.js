import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editChannelThunk } from '../../store/channel';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { loadServersThunk } from '../../store/server';
import './EditChannel.css'


const EditChannelForm = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams()
    const history = useHistory()

    const channel = useSelector((state) => state.channels[channelId])
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      return dispatch(editChannelThunk(channelId, name))
      .then(history.push(`/servers/${serverId}/channels/${channelId}`))
      .then(dispatch(loadServersThunk(user.id)))
    }

    const updateName = (e) => {
      setName(e.target.value);
    };

    useEffect(() => {
      if (channel) setName(channel.name)
    }, [])


    return (
      <form onSubmit={handleSubmit} className="edit-channel-form-container">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <h1 className='edit-channel-header'>Edit Channel</h1>
          <input
            className='edit-channel-name-input'
            name='name'
            type='text'
            placeholder='Edit your channel name'
            value={name}
            onChange={updateName}
            required
          />
        </div>
        <div className='edit-channel-button-container'>
          <button type='submit' className='edit-channel-button'>Edit Channel</button>
        </div>
      </form>
    );
  };

  export default EditChannelForm;
