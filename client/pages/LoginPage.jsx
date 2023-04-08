import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom'; // --> redirect 

export const LoginPage = () => {

	// DONE : const navigate = useNavigate(); // --> redirect 
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	////////////////////////////////////////////
	async function handleSubmit(e) {
	
	// make the fetch to the backend to authenticate the credentials
	try {
        e.preventDefault();
        // what are we fetching on line 16? Are we grabbing information from the database
		const res = await fetch('/users', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, password })
		});
	
		if (res.status === 200) {
			console.log('Authentication successful!');
            res.json();
			// Send the username and password to the server for authentication
            setName = (''); // does this  match with the userSchema (the word User)
            setPassword = ('');
			return redirect(`/UserHome/UserHomePage/${res.user_id}`); // TODO grab _id for URL
		  	
		} else {
			alert('Invalid username or password');
			return redirect(`/signup`); // TOD redirect
		}
		} catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////

    //do we need fetch for this as well?
    const redirectToSignupPage = () => {
	    redirect(`/signup`);
	}


	return (
		<main className='simple-wrapper'>
			<p className='simple-header'>Welcome to AllPacka!</p>
			{/* IMAGE OF AN ALPACA */}
			<p id='name-label' className='simple-subhead'>
				What's your username?
			</p>
			<Form onSumbit ={handleSubmit}>
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
                <div id='login-btn' className='simple-section'>
                    <button type='submit'>Login!</button>
                </div>
			</Form>

            {/* redirect to sign up page with the this button */}
            <div id='sign-up-btn' className='simple-section'>
                <button onClick={redirectToSignupPage}>Sign-Up!</button>
            </div>
		</main>
	);
};

