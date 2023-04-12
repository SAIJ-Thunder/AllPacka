/*
This page is fully functional! Signing up will try to add a user to the database, if it's a unique username it 
should work. That database call returns the user document without a password, stores it in global context 
'user', and redirect to the user home page. Information from the now populated 'user' context will be used to render
trip info on the user home page if they have trips.
*/

/*

Setting up bcrypt & sessions


// bcrypt//  AL

- start in user schema and set up the salt factor and hash so that each password is hashed 
  - requriing in bcrypt in the user model
  - decide on a salt work factor value
  - use the bcrypt middleware to run a function that hashes the user password before saving 
    - this is the "pre" middleware (https://mongoosejs.com/docs/middleware.html#pre)
// 

- for login page 
  - when users try to log in, they input their password
  - we will use bcrypt 
    - use compare function to determine if the input is the same as the value in db 
  - high level - redirect user to home page if compare function returns true/ false, redirect to signup


- for sign up page
  - go into the routes/controller that dictate creating a new user
  - behavior to bcrypt exists in DB so no expected real changes 



  // sessions (creating session) // JASMINE
  - user logs in
  - create a cookie that represents the session 
  - at the same time, we want to create a new session thats found in the database  
  - store user id in res.locals when user signs in (also look into best practices/alt)
  - add user to session schema, include the user info when a new session is creating

  - for sign up sessions - lets validate how behavior currently works - if creating a user will put you directly into the my trips page
  - if not // reset up route to create a session and navigate to my trips page


  // sessions (checking sessions)
  - the 'my trips', 'new trips' and 'trip details' page should all require a session check before rendering
  - research react router/authentication


  - look into oauth!

// clean up models- split into separate files

*/

import React, { useState, useContext } from 'react';
import { useNavigate, Form } from 'react-router-dom';
import { userContext } from '../context';


const SignUpPage = () => {

	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(userContext);
	const navigate = useNavigate()

	////////////////////////////////////////////
	async function handleSubmit(e) {
	
	// make the fetch to the backend to authenticate the credentials
	try {
    e.preventDefault();

		const response = await fetch('/api/user/signup', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username, password: password })
		});
     
    if(response.status === 200){

      const res = await response.json();
      console.log(res.verified)
      // **checking to see if user is already in database
      if (res.verified) {
        console.log('Signup successful!');
            
        setUsername('');
        setPassword('');

        setUser(res.user);
        
        return navigate(`/UserHomePage`);
      } else {
        console.log(res.verified)
        alert('Username already taken, or the username or password is invalid');
      }
    } else {
      alert('Server fail')
    }
		} catch (error) {
		console.error(error);
		}
  }
  
	/////////////////////////////////////////////////


	return (
		<main className='signup-page'>
			<p className='signup-page-header'>All Aboard the AllPacka!</p>
			{/* <p id='name-label' className='simple-subhead'>
				What's your username?
  </p> */}
			<Form onSubmit ={handleSubmit}>
                <div className='username-box'>
                    <span>What will your username be?</span>
                    <input 
                        type='text'
                        placeholder='username'
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='password-box'>
                    <span>What will your password be?</span>
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
                <div id='sign-up-btn' className='signup-button'>
                    <button type='submit'>Create Your AllPacka Account!</button>
                </div>
			</Form>
		</main>
	);
  
};

export default SignUpPage;