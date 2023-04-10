import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom';
import '../scss/LoginPage.scss';
import alpaca from '../assets/alpaca_cool.jpg';
import yosemite from '../assets/yosemite.jpg';

const LoginPage = () => {

	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
	////////////////////////////////////////////
	async function handleSubmit(e) {
	// make the fetch to the backend to authenticate the credentials
	try {
        e.preventDefault();
        // will this be a post request?
		const res = await fetch('/LoginPage', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
	
		if (res.status === 200 && res.verified) {
			console.log('Authentication successful!');
            res.json();
			// Send the username and password to the server for authentication 
            setUsername = (''); // does this  match with the userSchema (the word User)
            setPassword = ('');
			// return redirect(`/UserHomePage/${res.user_id}`); //!!! either user_id or username
		  return redirect(`/UserHomePage`);
		} else {
			alert('Invalid username or password');
			return redirect(`/SignupPage`); // TOD redirect
		}
		} catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////

    //do we need fetch for this as well?
    const redirectToSignupPage = () => {
	    return redirect(`/SignupPage`);
	}


	return (
		<main className='login-page'>
			<p className='login-header'>Welcome to AllPacka!</p>
			{/* IMAGE OF AN ALPACA */}
			<img
				src={alpaca}
				alt={'alpaca'}
				className="alpaca-image"
			/>
			{/* IMAGE OF YOSEMITE */}
			<img
				src={yosemite}
				alt={'yosemite'}
				className="yosemite-image"
			/>
			<p id='name-label' className='username-subhead'>
				What's your username?
			</p>
			<Form onSumbit ={handleSubmit}>
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
                <div id='login-btn' className='login-button'>
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