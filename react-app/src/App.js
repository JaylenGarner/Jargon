import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ServerPage from './components/Server/ServerPage';
import { authenticate } from './store/session';
import CreateServerForm from './components/Server/CreateServerForm';
import EditServerForm from './components/Server/EditServerForm';
import ChannelPage from './components/Channel/ChannelPage';
import CreateChannelForm from './components/Channel/CreateChannel';
import EditChannelForm from './components/Channel/EditChannel';
import InviteUser from './components/Server/InviteUser';
import DirectMessages from './components/DirectMessages/DirectMessages';
import DirectMessageChat from './components/DirectMessages/DirectMessageChat';
import MessageUserForm from './components/DirectMessages/MessageUserForm';
import ServerUsersList from './components/Server/ServerUsersList';
import HomePage from './components/HomePage';
import FourOFour from './components/fourOFour';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <div className='app'>
      <NavBar />
      <Switch>
      <Route path='/' exact={true} >
            <HomePage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <ServerUsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId' exact={true} >
          <ServerPage />
          <ServerUsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/create-server' exact={true} >
          <CreateServerForm />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId/edit-server' exact={true} >
          <ServerPage />
          <EditServerForm />
          <ServerUsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId/channels/:channelId' exact={true} >
          <ServerPage />
          <ChannelPage />
          <ServerUsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId/create-channel' exact={true} >
          <ServerPage />
          <CreateChannelForm />
          <ServerUsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId/channels/:channelId/edit-channel' exact={true} >
          <ServerPage />
          <EditChannelForm />
          <ServerUsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId/invite' exact={true} >
          <ServerPage />
          <InviteUser />
          <ServerUsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/direct-messages' exact={true} >
          <DirectMessages />
        </ProtectedRoute>
        <ProtectedRoute path='/direct-messages/invite' exact={true} >
          <DirectMessages />
          <MessageUserForm />
        </ProtectedRoute>
        <ProtectedRoute path='/direct-messages/:serverId' exact={true} >
          <DirectMessages />
          <DirectMessageChat />
        </ProtectedRoute>
        <ProtectedRoute path='/direct-messages/:serverId/:channelId' exact={true} >
          <DirectMessages />
          <ChannelPage/>
        </ProtectedRoute>
        <Route component={FourOFour}></Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
