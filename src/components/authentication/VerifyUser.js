import React from 'react';
import { Link } from 'react-router-dom';
function VerifyUser() {
    return (
        <div className="authForm">
            <h2>BKD Spices</h2>
            <div className="authContainer">
                <h4>Verify email address</h4>
                <span className="showUserEmail">An verify code sent your email address { } <Link to="/regiter">Change</Link></span>
                <label for="name">Enter OTP</label>
                <input type="text" value={ } name="name" className="userInfo" onChange={ } />
                <button onSubmit={}>Verify</button>
            </div>
        </div>
    );
}

export default VerifyUser;
