import React from 'react';
import './DmPageMessage.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const DmPageMessage = () => {

    const {serverId} = useParams()
    const server = useSelector((state) => state.servers[serverId])

    const user = useSelector((state) => state.session.user)

        return (
        <div className='server-page-message-container'>
                <h2>Welcome to your direct messages</h2>
                <span>Select a chat to get in on the jargon</span>
                <br></br>
                <img src={`${user.image}`} className='server-page-image'></img>
        </div>
        )
}

export default DmPageMessage;
