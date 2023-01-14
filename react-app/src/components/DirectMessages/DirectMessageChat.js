import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServersThunk } from '../../store/server'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const DirectMessageChat = () => {
  return <h1> DM CHAT</h1>
}

export default DirectMessageChat;
