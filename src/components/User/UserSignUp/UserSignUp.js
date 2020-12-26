import React from 'react'

import classes from './UserSignUp.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const UserSignUp = props => {

    return (
        <div className={classes.Session_container}>
            <div>
                <img 
                    src={require("../../../assets/images/Header/MainSlider/imgSlider1-mainpage.jpg")} 
                    alt="img" 
                />
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
                    <p className={classes.Account_access_btn}>Sign up</p>
                    <div>
                        <p></p>
                        <p>or sign up with</p>
                        <p></p>
                    </div>
                    <div className={classes.Form_icons_container}>
                        <div>
                            <FontAwesomeIcon 
                                icon={['fab', 'facebook-f']} 
                                size="2x" 
                                style={{color:"#2d88ff"}} 
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon 
                                icon={['fab', 'google']} 
                                size="2x" 
                                style={{color:'#e94538'}} 
                            />
                        </div>
                    </div>
                    <Link to="/user-login/">
                        <p>Already have an account? Enter here.</p>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default UserSignUp