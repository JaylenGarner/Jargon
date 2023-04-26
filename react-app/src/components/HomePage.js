import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from './auth/LoginForm';

const HomePage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory()

    if (user) {
        history.push('/direct-messages')
    }

        return (
                <div className='home-container'>

                    {!user &&
                    <div className='home-header-container'>
                    <h1 className='home-header'>Jargon</h1>
                    <img src='https://jargon-app-images.s3.amazonaws.com/jargon-favicon.png' className='jargon-logo'></img>
                    </div>
                        }
                    <div className='github-logo-container'>
                    <a href='https://github.com/JaylenGarner/Disbored'>
                    </a>
                    </div>
                    <div className='login-form-container'>
                        <LoginForm />
                    </div>
                </div>
        );
}

export default HomePage;
