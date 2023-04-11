/*
This page is fully functional! Signing up will try to add a user to the database, if it's a unique username it 
should work. That database call returns the user document without a password, stores it in global context 
'user', and redirect to the user home page. Information from the now populated 'user' context will be used to render
trip info on the user home page if they have trips.
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