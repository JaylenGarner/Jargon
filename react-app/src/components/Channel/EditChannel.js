import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editChannelThunk } from '../../store/channel';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";


const EditChannelForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams()
    const history = useHistory()

    const refresh = () => window.location.reload(true)

    const handleSubmit = async (e) => {
      // e.preventDefault();
    //   return dispatch(editChannelThunk(channelId, name)).then(history.push(`/`))
      return dispatch(editChannelThunk(channelId, name))
      .then(history.push(`/servers/${serverId}/channels/${channelId}`))
      .then(refresh())
    }

    const updateName = (e) => {
      setName(e.target.value);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='name'>Channel Name</label>
          <input
            name='name'
            type='text'
            placeholder='Edit your channel name'
            value={name}
            onChange={updateName}
          />
        </div>
        <div>
          <button type='submit'>Edit Channel</button>
        </div>
      </form>
    );
  };

  export default EditChannelForm;
