import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { createServerThunk } from '../../store/server';
import { useHistory } from 'react-router-dom';
import ServerPage from './ServerPage';

// TO DO
// REDIRECT USER TO NEWLY CREATED SERVER , NEED TO GET SERVER ID POST CREATION

const CreateServerForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [image, SetImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const data = await dispatch(createServerThunk(name, image));
    // return dispatch(createServerThunk(name, image))
    // .then(history.push(`/servers/`))
    // .then(refresh())


    if (data) {
      setErrors(data);
      return <Redirect to='/' />;
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateImage = (e) => {
    SetImage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='name'>Server Name</label>
        <input
          name='name'
          type='text'
          placeholder='Enter your server name'
          value={name}
          onChange={updateName}
        />
      </div>
      <div>
        <label htmlFor='image'>Server image</label>
        <input
          name='image'
          type='text'
          placeholder='Enter a valid image url'
          value={image}
          onChange={updateImage}
        />
        <button type='submit'>Create Server</button>
      </div>
    </form>
  );
};

export default CreateServerForm;
