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
    }

        return (
            <div>
                    {/* <Link to='/login' className='nav-bar-login'>LOGIN</Link>
                    <Link to='/sign-up' className='nav-bar-signup'>SIGN UP</Link> */}
                    {/* <img className='github-logo' src='https://i.pinimg.com/originals/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.png'></img> */}

                <div className='home-container'>
                    <h1 className='disbored-home-header'>Page Not Found</h1>
                    {/* <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b544a3e3c7c05753bcd_full_logo_white_RGB.png' alt='image1' className='header-image-home'/> */}
                        <div className='home-buttons'>
                            <Link to='/login'>
                                <button className='home-login-button'>Login</button>
                            </Link>
                            <Link to='/sign-up'>
                                <button className='home-signup-button'>Signup</button>
                            </Link>
                        </div>
                    <p className='home-intro'>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                    <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a3426a21d01b590ba3c246_2.svg' alt='image2' className='header-image-home2'/>
                </div>
            </div>
        );
}

export default FourOFour;
