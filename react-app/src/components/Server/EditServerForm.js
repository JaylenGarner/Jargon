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
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [image, SetImage] = useState('');
  const user = useSelector(state => state.session.user);
  const {serverId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const refresh = () => window.location.reload(true)

  const handleSubmit = async (e) => {

    // const data = await dispatch(editServerThunk(serverId, name, image));
    return dispatch(editServerThunk(serverId, name, image))
    .then(history.push(`/servers/${serverId}`))
    .then(refresh())
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateImage = (e) => {
    SetImage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-server-form-container'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <h1 className='edit-form-header'>Edit Server</h1>
        <p className='edit-form-server'>Server Name</p>
        <input
          className='edit-form-name-input'
          name='name'
          type='text'
          placeholder={name}
          value={name}
          onChange={updateName}
        />
      </div>
      <div>
        <p className='edit-form-image-server'>Server Image</p>
        <input
          className='edit-form-image-input'
          name='image'
          type='text'
          placeholder={image}
          value={image}
          onChange={updateImage}
        />
        <div className='edit-form-button-container'>
        <button type='submit' className='edit-form-button'>Edit Server</button>
        </div>
      </div>
    </form>
  );
};

export default EditServerForm;