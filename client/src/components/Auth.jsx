import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

const initialState = {
    username: '',
    password: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

        console.log(form)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form)
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
                            <button>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth