import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const users = JSON.parse(localStorage.getItem('signupData')) || [];

        const inputEmail = emailRef.current.value;
        const inputPassword = passwordRef.current.value;

        const user = users.find((user) => user.email === inputEmail && user.password === inputPassword);

        if (user) {
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            localStorage.setItem('loggedInEmail', user.email);

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            setSuccessMessage('');
            setErrorMessage('Invalid email or password');
        }
        

    };

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="relative bg-white max-w-md mx-auto w-full px-12 py-8 flex gap-12 flex-col items-center rounded shadow-md">
                <h2 className="text-3xl font-semibold">Login</h2>
                    {successMessage && <p className='text-green-500 absolute top-20'>{successMessage}</p>}
                    {errorMessage && <p className='text-red-500 absolute top-20'>{errorMessage}</p>}
                <form onSubmit={handleLogin} className="flex flex-col gap-8 w-full">
                    <input
                        required
                        ref={emailRef}
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        className="border-b focus:outline-none focus:border-black focus:invalid:border-red-500 invalid:text-red-600"
                        type="text"
                        id="Email"
                        placeholder="Email"
                    />
                    <input
                        required
                        ref={passwordRef}
                        className="border-b focus:outline-none focus:border-black"
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                    <button className="bg-black text-white py-2 rounded" type="submit">
                        Login
                    </button>
                    <p>
                        Don't have an account?{' '}
                        <Link to={'/register'} className="text-cyan-600">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;