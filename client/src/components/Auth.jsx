import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

const cookies = new Cookies()

const initialState = {
    username: '',
    password: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = form;
        const url = 'http://localhost:5000/auth'

        const { data: { token, userId, hashedPassword } } = await axios.post(`${url}/${isSignup ? 'signup' : 'login'}`, {
            username, password,
        })

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('userId', userId)

        window.location.reload()
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className='auth__form-container_fields-content'>
                    <p>Log In</p>
                    <form onSubmit={handleSubmit}>
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input 
                                name="username" 
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password" 
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Log In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth