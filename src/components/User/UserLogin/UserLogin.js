import React from 'react'

import classes from './UserLogin.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserLogin = props => {

    return (
        <div className={classes.Session_container}>
            <div className={classes.Login_img_container}>
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
                    <div className="mt-4 row align-items-center">
                        <p className={`col-4 ${classes.Form_lines}`}></p>
                        <p className="col-4 text-center">or log in with</p>
                        <p className={`col-4 ${classes.Form_lines}`}></p>
                    </div>
                    <div className={classes.Form_icons_container}>
                        <div className="border">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x" style={{color:"#2d88ff"}}/>
                        </div>
                        <div className="border">
                            <FontAwesomeIcon icon={['fab', 'google']} size="2x" style={{color:'#e94538'}} />
                        </div>
                    </div>
                    <p className={classes.Form_recover_pass}>Forgot login or password?</p>
                </div>
            </div>
        </div>
    )
}

export default UserLogin