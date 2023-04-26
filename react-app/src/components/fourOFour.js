import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const FourOFour = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory()

    if (user) {
        history.push('/direct-messages')
    } else {
        history.push('/')
    }

    return (<></>)

}

export default FourOFour;
