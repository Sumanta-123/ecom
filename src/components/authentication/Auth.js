import './Auth.scss';
import React, {useReducer, useState} from 'react';
import { Link } from 'react-router-dom';
const initialState = {
    user: {
        name: '',
        username: '',
        password: '',
        confirm_password: ''
    }
}

function Auth() {
    const [user, setUser] = useState(initialState.user);
    // const [user, dispatch] = useReducer(initialState)
    // console.log(user)
    // const { name, username, password, confirmPassword } = user;
    const { name, username, password, confirm_password } = user;

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //Do something
        console.log('Data is uploading.....')
        //Validate the form field
    }
    return (
        <div className="authForm">
            {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
            {/* {console.log(user)} */}
            <h2>BKD Spices</h2>
            <form onSubmit={handleSubmit} className="authContainer">
                <h2>Create Account</h2>
                <label>Your name</label>
                <input type="text" value={name} name="name" className="userInfo" onChange={handleChange} />
                <label>Mobile number or email</label>
                <input type="text" value={username} name="username" className="userInfo" onChange={handleChange} />
                <label>Password</label>
                <input type="text" value={password} name="password" className="userInfo" onChange={handleChange}  placeholder="At least 6 characters"/>
                <label>Password again</label>
                <input type="text" value={confirm_password} name="confirm_password" onChange={handleChange} className="userInfo" />
                <button className="submitButton">Continue</button>
                <div className="lineDevider">
                    <span>By creating an account or logging in, you agree to Amazon’s Conditions of Use and Privacy Policy.</span>
                </div>
                <div className="formFooter">
                    <div>
                        Already have an account? <Link to="/signin">Sign in </Link>
                    </div>
                    <div>
                        Buying for work? <Link to="/register">Create a free business account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Auth;
