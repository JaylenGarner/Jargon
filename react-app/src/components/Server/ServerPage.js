import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServerThunk } from '../../store/server';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Server.css';

// TO DO
// NEEDS TO REDIRECT HOME UPON DELETING A SERVER

const ServerPage = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams()
    const user = useSelector((state) => state.session.user)
    const serversArr = []
    const servers = Object.values(useSelector((state) => state.servers))
    const history = useHistory()
    let resServer;

    const refresh = () => window.location.reload(true)

    const handleDelete = () => {
         dispatch(deleteServerThunk(serverId)).then(refresh())
         return <Redirect to='/' />;
    }

    for (let i = 0; i < servers.length; i++) {
        let innerServers = servers[i]

        innerServers.forEach((server) => {
            serversArr.push(server)
            if (server.id == serverId) resServer = server
        });
    }

    if (!resServer) {
        return null
    } else {
        return (
            <nav className='server-page-nav'>
                <div>
                    <div className='server-name-container'>
                <h1>{resServer.name}</h1>
                    </div>
                <h2>Channels</h2>
                 {resServer.channels.map((channel) => {
                        if (!channel) {
                            return null
                        } else {
                            return (
                                <div key={channel.id}>
                                    <h3>{channel.name}</h3>
                                </div>
                            )
                        }
                    })}
                </div>
                <br></br>
                <div>
                <NavLink to={`/servers/${serverId}/edit-server`} exact={true} activeClassName='active'>
                    <button>Edit Server</button>
                </NavLink>
                    <br></br>
                    <br></br>
                    <button onClick={handleDelete}>Delete Server</button>
                </div>
            </nav>)
        }
    }



    // return (
        //     <nav className='nav-bar'>
        //         <div className='discord-logo-container'>
        //           <NavLink to='/' exact={true} activeClassName='active'>
        //             <img src='https://support.discord.com/hc/user_images/PRywUXcqg0v5DD6s7C3LyQ.jpeg' className='discord-logo'></img>
        //           </NavLink>
        //         </div>
        //         {user && <NavServers />}
        //         <br></br>
        //     </nav>
        //   );
        // }




export default ServerPage;
