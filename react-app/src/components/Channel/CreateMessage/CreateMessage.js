import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessageThunk } from '../../../store/message';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// TO DO
// REDIRECT TO NEWLY CREATED CHANNEL
const CreateMessage = ({channelName}) => {
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const {channelId} = useParams()
    const history = useHistory()

    const refresh = () => window.location.reload(true)

    const handleSubmit = async (e) => {
      return dispatch(createMessageThunk(channelId, body))
      .then(refresh())
    };

    const updateBody = (e) => {
      setBody(e.target.value);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='body'></label>
          <input
            name='body'
            type='text'
            placeholder={`Message #${channelName}`}
            value={body}
            onChange={updateBody}
            required
          />
        </div>
        <div>
          <button type='submit' onSubmit={handleSubmit}>Send</button>
        </div>
      </form>
    );
  };

  export default CreateMessage;
