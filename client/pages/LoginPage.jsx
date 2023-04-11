import React, { useState, useContext } from 'react';
import { useNavigate, Form, redirect } from 'react-router-dom';
import { userContext } from '../context';
import '../scss/LoginPage.scss';
import alpaca from '../assets/alpaca_cool.jpg';
import yosemite from '../assets/yosemite.jpg';

const LoginPage = () => {

	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(userContext)
 	const navigate = useNavigate();

  
	////////////////////////////////////////////
	async function handleSubmit(e) {
	// make the fetch to the backend to authenticate the credentials
	try {
        e.preventDefault();
        // will this be a post request?
		const response = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
    });

    console.log(response.status)
    if(response.status === 200){

    const res = await response.json();
    console.log(res.verified)
    
      if (res.verified) {
        console.log('Authentication successful!');
            
        // Send the username and password to the server for authentication 
        setUsername(''); // does this  match with the userSchema (the word User)
        setPassword('');
        setUser(res.user);
        console.log(res.user.trips)
        // return redirect(`/UserHomePage/${res.user_id}`); //!!! either user_id or username
        return navigate(`/UserHomePage`);
      } else {
        console.log(res.verified)
        alert('Invalid username or password');
      }
			// return redirect(`/SignUpPage`); // TOD redirect
    } else {
      alert('Server fail')
    }
    
		} catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////

    //do we need fetch for this as well?
    const redirectToSignupPage = () => {
	    return navigate(`/SignUpPage`);
	}


	return (
		<main className='login-page'>
			<p className='login-header'>
			{/* <img
				src={alpaca}
				alt={'alpaca'}
				className="alpaca-image"
			/> */}
				Welcome to AllPacka!
			</p>
			{/* IMAGE OF AN ALPACA */}
			<img
				src={alpaca}
				alt={'alpaca'}
				className="alpaca-image"
			/>
			{/* IMAGE OF YOSEMITE */}
			{/* <img
				src={yosemite}
				alt={'yosemite'}
				className="yosemite-image"
			/> */}
			<p id='name-label' className='username-subhead'>
				Log into AllPacka!
			</p>
			<Form onSubmit ={handleSubmit}>
                <div className='username-section'>
                    <input 
                        type='text'
                        placeholder='username'
                        // placeholder="What's a good nickname?..." 
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='password-section'>
                    <input 
                        type='text'
                        placeholder="password" 
                        value = {password}     
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit();
                        }}
                    />
                </div>
                <div id='login-button' className='login-button'>
                    <button type='submit'>Login!</button>
                </div>
			</Form>

            {/* redirect to sign up page with the this button */}
            <div id='sign-up-btn' className='signup-button'>
                <button onClick={redirectToSignupPage}>Sign-Up!</button>
            </div>
		</main>
	);
  
  
  // return (
  //   <h1>Login Page</h1>
  // )

};

export default LoginPage;