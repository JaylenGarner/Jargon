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
                    <div className='social-links'>
                    <a href='https://github.com/JaylenGarner' target="_blank">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" class="social-logo"></img>
                    </a>
                    <a href='https://www.linkedin.com/in/jaylen-garner-00a252205/' target="_blank">
                    <img src='https://st4.depositphotos.com/18850080/21051/v/600/depositphotos_210516622-stock-illustration-linkedin-logo-icon-social-media.jpg' className='social-logo'></img>
                    </a>
                    <a href='https://wellfound.com/u/jaylen-garner' target="_blank">
                    <img src='https://www.logolynx.com/images/logolynx/89/890e037ba670b615fb4b26106f253cad.jpeg' className='social-logo'></img>
                    </a>
                    </div>
                    <div className='home-header-container'>
                    <h1 className='home-header'>Jargon</h1>
                    <img src='https://jargon-app-images.s3.amazonaws.com/jargon-favicon.png' className='jargon-logo'></img>
                    </div>
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
