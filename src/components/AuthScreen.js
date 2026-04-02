import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const auth = getAuth();

    const handleAuth = async () => {
        try {
            if (isLoginMode) {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Login Successful!');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('User Registration Successful!');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>{isLoginMode ? 'Login' : 'Register'}</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleAuth}>{isLoginMode ? 'Login' : 'Register'}</button>
            <button onClick={() => setIsLoginMode(!isLoginMode)}>
                Switch to {isLoginMode ? 'Register' : 'Login'}
            </button>
        </div>
    );
};

export default AuthScreen;