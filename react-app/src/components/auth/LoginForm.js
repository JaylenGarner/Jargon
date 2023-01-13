import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-container'>
    <form onSubmit={onLogin} className="form-container">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <h1 className='login-header'>WELCOME BACK!</h1>
        <p className='email-header'>EMAIL</p>
        <label htmlFor='email'></label>
        <input
          className='email-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        <p className='password-header'>PASSWORD</p>
        <label htmlFor='password'></label>
        <input
          className='password-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <p className='forgot-password'>Forgot your password?</p>
      <div>
        <button type='submit' className='login-button'>Login</button>
      </div>
        <p className='register-link'>Need an account? Register</p>
    </form>
  </div>
  );
};

export default LoginForm;
