import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, image));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-container'>
    <form onSubmit={onSignUp} className="signup-form">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <h1 className='signup-header'>Create an account</h1>
        <input
          className='signup-input'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Username'
          required
        ></input>
      </div>
      <div>
        <input
          className='signup-input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email'
          required
        ></input>
      </div>
      <div>
        <input
          className='signup-input'
          type='text'
          name='image'
          onChange={updateImage}
          placeholder='Profile Picture (Enter a valid image URL)'
          value={image}
          required
        ></input>
      </div>
      <div>
        <input
          className='signup-input'
          type='password'
          name='password'
          onChange={updatePassword}
          placeholder='password'
          value={password}
          required
        ></input>
      </div>
      <div>
        <input
          className='signup-input'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          placeholder='Repeat Password'
          value={repeatPassword}
          required
        ></input>
      </div>
      <div className='signup-button-container'>
      <button type='submit' className='signup-button'>Sign Up</button>
      </div>
      <NavLink to='/login' className='signup-navlink'>
      <span  className='account-owner'>Already have an account?</span>
      </NavLink>
    </form>
    </div>
  );
};

export default SignUpForm;
