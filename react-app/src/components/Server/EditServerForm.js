import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editServerThunk } from '../../store/server';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './EditServerForm.css'


// TO DO
// REDIRECT USER TO NEWLY CREATED SERVER , NEED TO GET SERVER ID POST CREATION

const EditServerForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {serverId} = useParams();
  const user = useSelector(state => state.session.user);
  const server = useSelector(state => state.servers[serverId]);

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [image, SetImage] = useState('');

  const handleSubmit = async (e) => {

    return dispatch(editServerThunk(serverId, name, image))
    .then(history.push(`/servers/${serverId}`))
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateImage = (e) => {
    SetImage(e.target.value);
  };

  if (server && name === '') {
    setName(server.name)
  }

  if (server && image === '') {
    SetImage(server.image)
  }


  return (
    <form onSubmit={handleSubmit} className='edit-server-form-container'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <h1 className='edit-form-header'>Edit Server</h1>
        <input
          className='edit-form-name-input'
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
          className='edit-form-image-input'
          name='image'
          type='text'
          placeholder='Enter a valid image url'
          value={image}
          onChange={updateImage}
          required
        />
        <div className='edit-form-button-container'>
        <button type='submit' className='edit-form-button'>Edit Server</button>
        </div>
      </div>
    </form>
  );
};

export default EditServerForm;
