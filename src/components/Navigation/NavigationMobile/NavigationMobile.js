import React from 'react'

import classes from './NavigationMobile.module.css'

import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const NavigationMobile = props => {


    const translateMenu = {
        transform: `translateX(${props.translateValue}%)`,
        transition: '.8s ease-in-out'
    }


    return (
        <div 
            className={classes.Navigation_mobile_container}
            style={translateMenu}
        >
            <div className={classes.Navigation_mobile_subContainer}>
                <FontAwesomeIcon 
                    onClick={() => props.toggleMenu()}
                    icon="times" size="2x" 
                />
                <ul className={classes.Navigation_mobile_list} >
                    <li>
                        <NavLink 
                            onClick={() => props.toggleMenu()}
                            to="/" 
                            exact
                        > Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            onClick={() => props.toggleMenu()}
                            to="/shop/" 
                        > Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            onClick={() => props.toggleMenu()}
                            to="/user-login/" 
                        > Login
                        </NavLink>
                    </li>
                </ul>
                <div className={classes.Navigation_mobile_contacts} >
                    <div>
                        <h6>CONTACTS</h6>
                        <div>
                            <p>hello@myhome.com</p>
                            <p>+375 29 364-74-69</p>
                            <NavLink
                                onClick={() => props.toggleMenu()}
                                to="/contact/" 
                                exact
                            > Form
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <h6>STAY SOCIAL</h6>
                        <div>
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                            <FontAwesomeIcon icon={['fab', 'vk']} />
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default NavigationMobile