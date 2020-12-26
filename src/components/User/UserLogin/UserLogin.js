import React from 'react'

import classes from './UserLogin.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const UserLogin = props => {

    return (
        <div className={classes.Session_container}>
            <div>
                <img 
                    src={require("../../../assets/images/Header/MainSlider/imgSlider1-mainpage.jpg")} 
                    alt="img" 
                />
            </div>
            <div className={classes.Login_form_container}>
                <div className={classes.Login_form} >
                    <h3>Log in</h3>
                    <div>
                        <label>Email</label>
                        <input />
                    </div>
                    <div>
                        <label>Password</label>
                        <input />
                    </div>
                    <p className={classes.Account_access_btn}>Log in</p>
                    <div>
                        <p></p>
                        <p>or log in with</p>
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
                    <Link to="/user-signup/">
                        <p>Or click here to create an account.</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserLogin