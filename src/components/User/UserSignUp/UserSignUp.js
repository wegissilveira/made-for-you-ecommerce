import React from 'react'

import './UserSignUp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const UserSignUp = props => {

    return (
        <div className="session-container d-flex justify-content-between">
            <div className="login-img-container">
                {/* <img /> */}
            </div>
            <div className="login-form-container">
                <div className="login-form" >
                    <h3>Sign up</h3>
                    <div>
                        <label>Email</label>
                        <input />
                    </div>
                    <div>
                        <label>Password</label>
                        <input />
                    </div>
                    <div>
                        <label>Repeat Password</label>
                        <input />
                    </div>
                    <p style={{marginTop: '15px'}} className="account-access-btn">Sign up</p>
                    <div className="mt-4 row align-items-center">
                        <p className="col-4 enter-lines"></p>
                        <p className="col-4 text-center">or sign up with</p>
                        <p className="col-4 enter-lines"></p>
                    </div>
                    <div className="enter-icons-container">
                        <div className="border">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x" style={{color:"#2d88ff"}} />
                        </div>
                        <div className="border">
                            <FontAwesomeIcon icon={['fab', 'google']} size="2x" style={{color:'#e94538'}} />
                        </div>
                    </div>
                    <Link
                        to="/user-login/"
                        style={{color: 'grey'}}
                    >
                        <p className="enter-recover-pass">Already have an account?</p>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default UserSignUp