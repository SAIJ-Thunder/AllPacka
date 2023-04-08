import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom';

export const SignUpPage = () => {

	const navigate = useNavigate(); // --> redirect 
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	////////////////////////////////////////////
	async function handleSubmit(e) {
	
	// make the fetch to the backend to authenticate the credentials
	try {
        e.preventDefault();
		const response = await fetch('/users', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, password })
		});
        // **checking to see if user is already in database
		if (res.status === 200 && name !== res.body) { 
			console.log('Signup successful!');
			// Send the username and password to the server for authentication
			return redirect(`/LoginPage`);
		  	
		} else {
			alert('Username already taken');
			return redirect(`/LoginPage`);
		}
		} catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////


	return (
		<main className='simple-wrapper'>
			<p className='simple-header'>All Aboard the AllPacka!</p>
			{/* <p id='name-label' className='simple-subhead'>
				What's your username?
			</p> */}
			<Form onSumbit ={handleSubmit}>
                <div className='simple-section'>
                    <span>What will your username be?</span>
                    <input 
                        type='text'
                        placeholder='username'
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='simple-section'>
                    <span>What will your password be?</span>
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
                    <button type='submit'>Create Your AllPacka Account!</button>
                </div>
			</Form>
		</main>
	);
};