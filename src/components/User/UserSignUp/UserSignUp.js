import React from 'react'

import classes from './UserSignUp.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const UserSignUp = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.SignUp_img_container}>
                {/* <img /> */}
            </div>
            <div className={classes.SignUp_form_container}>
                <div className={classes.SignUp_form} >
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
                    <p style={{marginTop: '15px'}} className={classes.Account_access_btn}>Sign up</p>
                    <div className="mt-4 row align-items-center">
                        <p className={`col-4 ${classes.Form_lines}`}></p>
                        <p className="col-4 text-center">or sign up with</p>
                        <p className={`col-4 ${classes.Form_lines}`}></p>
                    </div>
                    <div className={classes.Form_icons_container}>
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
                        <p className={classes.Form_recover_pass}>Already have an account?</p>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default UserSignUp