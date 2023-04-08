import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom';

export const SignUpPage = () => {

	const navigate = useNavigate(); // --> redirect 
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	////////////////////////////////////////////
	// async function handleSubmit() {
	
	// // make the fetch to the backend to authenticate the credentials
	// try {
	// 	const response = await fetch('/users', {
	// 		method: 'POST',
	// 		headers: {
	// 		'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ name, password })
	// 	});
	
	// 	if (response.ok) {
	// 		console.log('Authentication successful!');
	// 		// Send the username and password to the server for authentication
	// 		navigate(`/chat/${name}`);
		  	
	// 	} else {
	// 		alert('Invalid username or password');
	// 		navigate(`/`);
	// 	}
	// 	} catch (error) {
	// 	console.error(error);
	// 	}
	// }
	/////////////////////////////////////////////////


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

                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='simple-section'>
                    <input 
                        type='text'
                        placeholder="password" 
                        value = {password}     
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSumbit();
                        }}
                    />
                </div>
                <div id='sign-up-btn' className='simple-section'>
                    <button type='submit'>Create Account!</button>
                </div>
			</form>
		</main>
	);
};