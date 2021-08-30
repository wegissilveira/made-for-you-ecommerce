import React from 'react'

import classes from './UserForm.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const loginForm = {
    title: 'Log in',
    inputs: ['Email', 'Password'],
    button: 'Log in',
    caption: 'or log in with',
    redirectLink: '/user-signup/',
    redirectMsg: 'Or click here to create an account.' 
}

const signUpForm = {
    title: 'Sign up',
    inputs: ['Email', 'Password', 'Repeat Password'],
    button: 'Sign up',
    caption: 'or sign up with',
    redirectLink: '/user-login/',
    redirectMsg: 'Already have an account? Enter here.' 
}


const UserForm = props => {
    let form = props.form === 'login' ? {...loginForm} : {...signUpForm}


    return (
        <div className={classes.Session_container}>
            <div>
                <img 
                    src={require("../../../assets/images/Header/MainSlider/imgSlider1-mainpage.jpg")} 
                    alt="img" 
                />
            </div>
            <div className={classes.UserForm_container}>
                <div className={classes.UserForm_subContainer} >
                    <h3>{form.title}</h3>
                    {
                        form.inputs.map(input => {
                            return (
                                <div key={input}>
                                    <label>{input}</label>
                                    <input />
                                </div>
                            )
                        })
                    }
                    <p className={classes.Account_access_btn}>{form.button}</p>
                    <div className={classes.UserForm_caption}>
                        <span></span>
                        <p>{form.caption}</p>
                        <span></span>
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
                    <Link to={`${process.env.PUBLIC_URL}/${form.redirectLink}`}>
                        <p>{form.redirectMsg}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserForm