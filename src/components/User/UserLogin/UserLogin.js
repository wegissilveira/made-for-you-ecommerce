import React from 'react'

import './UserLogin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserLogin = props => {

    return (
        <div className="session-container d-flex justify-content-between">
            <div className="login-img-container">
                {/* <img /> */}
            </div>
            <div className="login-form-container">
                <div className="login-form" >
                    <h3>Log in</h3>
                    <div>
                        <label>Email</label>
                        <input />
                    </div>
                    <div>
                        <label>Password</label>
                        <input />
                    </div>
                    <p className="account-access-btn">Log in</p>
                    <div className="mt-4 row align-items-center">
                        <p className="col-4 enter-lines"></p>
                        <p className="col-4 text-center">or log in with</p>
                        <p className="col-4 enter-lines"></p>
                    </div>
                    <div className="enter-icons-container">
                        <div className="border face-icon-enter">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x" style={{color:"#2d88ff"}}/>
                        </div>
                        <div className="border">
                            <FontAwesomeIcon icon={['fab', 'google']} size="2x" style={{color:'#e94538'}} />
                        </div>
                    </div>
                    <p className="enter-recover-pass">Forgot login or password?</p>
                </div>
            </div>
        </div>
    )
}

export default UserLogin