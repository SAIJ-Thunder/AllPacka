import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom'; // --> redirect 

export const LoginPage = () => {

	const navigate = useNavigate(); // --> redirect 
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	////////////////////////////////////////////
	async function handleSubmit() {
	
	// make the fetch to the backend to authenticate the credentials
	try {
		const res = await fetch('/users', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, password })
		});
	
		if (res.status === 200) {
			// console.log('Authentication successful!');
			// Send the username and password to the server for authentication
			navigate(`/users/${res.user_id}`); // TODO grab _id for URL
		  	
		} else {
			alert('Invalid username or password');
			navigate(`/signup`); // TOD redirect
		}
		} catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////

    const redirectToSignupPage = () => {
	    navigate(`/signup`);
	}


	return (
		<main className='simple-wrapper'>
			<p className='simple-header'>Welcome to Our Chat room</p>
			<p id='name-label' className='simple-subhead'>
				What's your username?
			</p>
			<form onSumbit ={handleSubmit}>
                <div className='simple-section'>
                    <input 
                        type='text'
                        placeholder='username'
                        // placeholder="What's a good nickname?..." 

                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='simple-section'>
                    <input 
                        type='text'
                        autoComplete='name'
                        placeholder="password" 
                        value = {password}     
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSumbit();
                        }}
                    />
                </div>
                <div id='logiin-btn' className='simple-section'>
                    <button type='submit'>Login!</button>
                </div>
			</form>
            {/* redirect to sign up page with the this button */}
            <div id='sign-up-btn' className='simple-section'>
                <button onClick={redirectToSignupPage}>Sign-up!</button>
            </div>
		</main>
	);
};