import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { createServerThunk } from '../../store/server';
import { useHistory } from 'react-router-dom';
import ServerPage from './ServerPage';
import { useEffect } from 'react';
import './CreateServer.css'

// TO DO
// REDIRECT USER TO NEWLY CREATED SERVER , NEED TO GET SERVER ID POST CREATION

const CreateServerForm = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [image, SetImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = await dispatch(createServerThunk(name, image));

    if (!data.ok) {
      setError("Server name is in use")
      setName('')
      SetImage('')
    } else {
      setError(null)
    }

    history.push('/')

  };

  useEffect(() => {

  }, [dispatch, error]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateImage = (e) => {
    SetImage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='create-form-container'>
      <div>
      <h1 className='create-form-header'>Create a server</h1>
      <p className='create-form-intro'>Your server is where you and your friends hang out.
          Make yours and start talking.
      </p>
        <input
          className='create-form-name-input'
          name='name'
          type='text'
          placeholder='Enter your server name'
          value={name}
          onChange={updateName}
          required
        />
      </div>
      <div>
        <input
          className='create-form-image-input'
          name='image'
          type='text'
          placeholder='Enter a valid image url'
          value={image}
          onChange={updateImage}
          required
        />
        <div className='create-form-button-container'>
        <button type='submit' className='create-form-button'>Create Server</button>
        <br></br>
        <div className='invite-error-container'>
        {(error !== null) && <span className='invite-user-error'>{error}</span>}
        </div>
        </div>
      </div>
    </form>
  );
};

export default CreateServerForm;
