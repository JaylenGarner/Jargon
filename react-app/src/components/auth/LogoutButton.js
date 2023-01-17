import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import { clearServersThunk } from '../../store/server';
import { clearChannelThunk } from '../../store/channel';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout())
    .then(dispatch(clearServersThunk()))
    .then(dispatch(clearChannelThunk()))
  };

  return <button onClick={onLogout} className='logout-button'>Logout</button>;
};

export default LogoutButton;
