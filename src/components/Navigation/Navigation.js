import React from 'react'

import classes from './Navigation.module.css'
import './Navigation.css'

import { NavLink, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'

import NavigationMobile from './NavigationMobile/NavigationMobile'


const Navigation = props => {
    
    let [searchProduct, setSearchProduct] = React.useState(false) 
    let [input, setInput] = React.useState('') 

    let [translateMenuValue, setTranslateMenuValue] = React.useState(-100) 

    
    const searchRef = React.useRef()

    // Executa a busca com o click na lupa
    const searchProductHandler = e => {
        let inputValue = e.currentTarget.parentNode.childNodes[0].value
        
        if (inputValue.length >= 3) {
            setSearchProduct(true)
            setInput(inputValue)
        } else {
            setSearchProduct(false)
            setInput(inputValue)
        }
    }

    // Executa a busca com o 'Enter'
    const keydownSearchHandler = e => {
        if (e.keyCode === 13) {
            if (input.length >= 3) {
                props.history.push("/search/" + input)
            } else {
                alert('Search requires at least three letters')
            }
        }
    }

    const mobileMenuHandler = () => {
        const body = document.getElementsByTagName('BODY')[0]

        if (translateMenuValue === 0) {
            setTranslateMenuValue(-100)
            body.style.overflow = 'scroll'
        } else {
            setTranslateMenuValue(0)
            body.style.overflow = 'hidden'
        }
    }

    React.useEffect(() => {
        searchRef.current.addEventListener('keydown', keydownSearchHandler)

        return () => 
            searchRef.current.removeEventListener('keydown', keydownSearchHandler)
    })

    let bag_color = props.cart.length > 0 ? 'green' : 'grey'
    let heart_color = props.wish.length > 0 ? 'red' : 'grey'
    
    let search_input = 
        searchProduct ? 
            <NavLink to={"/search/" + input}>
                <FontAwesomeIcon 
                    icon="search" 
                    color="grey" 
                />
            </NavLink>
        :
            <FontAwesomeIcon 
                icon="search" 
                color="grey" 
                onClick={() => alert('A busca precisa ter ao menos 3 caracteres')}
            /> 


    return (
        <nav>
            <div className={classes.Navbar_container}>
                <div>                            
                    <ul>
                        <li >
                            <NavLink 
                                to="/" 
                                exact
                            > Home
                            </NavLink>
                        </li>
                        <li >
                            <NavLink 
                                to="/shop/" 
                                exact
                            > Shop
                            </NavLink>
                        </li>
                        <li >
                            <NavLink 
                                to="/contact/" 
                                exact
                            > Contacts
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <Link
                    to="/" 
                    className={classes.Logo}
                > m
                    <span>y</span>Home
                </Link>

                <div>
                    <p>+375 29 364-74-69</p>

                    <ul className={classes.Account_icons}>
                        <li ref={searchRef}>
                            <input onChange={searchProductHandler}/>
                            { search_input }
                        </li>
                        <li>
                            <NavLink
                                className={classes.Enter_account_btn}
                                to="/user-login/"
                            >
                                <FontAwesomeIcon 
                                    icon={['far', 'user']} 
                                    color="grey" 
                                />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wishlist/">
                                <FontAwesomeIcon 
                                    icon={['far', 'heart']} 
                                    color={ heart_color } 
                                />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart/">
                                <FontAwesomeIcon 
                                    icon='shopping-bag' 
                                    color={ bag_color } 
                                />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <FontAwesomeIcon 
                onClick={mobileMenuHandler}
                className={classes.Menu_hamburger}
                icon="bars" color="grey" size="2x" 
            />
            <NavigationMobile 
                toggleMenu={mobileMenuHandler} 
                translateValue={translateMenuValue}
            />
        </nav>
    )
}

// export default Navigation

const mapStateToProps = state => {
    return {
        wish: state.wishlistState,
        cart: state.cartListState
    }
}


export default withRouter(connect(mapStateToProps)(Navigation))