import React from 'react';
import './ServerPageMessage.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ServerPageMessage = () => {

    const {serverId} = useParams()
    const server = useSelector((state) => state.servers[serverId])

    if (!server) {
        return <></>
    } else {
        return (
        <div className='server-page-message-container'>
                <h2>Welcome to the {server.name} server</h2>
                <span>Select a channel to get in on the jargon</span>
                <br></br>
                <img src={`${server.image}`} className='server-page-image'></img>
        </div>
        )
    }
}

export default ServerPageMessage
