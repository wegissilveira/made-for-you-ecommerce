import React, {Component, Fragment} from 'react'

import classes from './Layout.module.css'
import './Layout.css'

import Footer from '../../components/Footer/Footer'

import { NavLink, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GoogleFontLoader from 'react-google-font-loader'
import { connect } from 'react-redux'


class Layout extends Component {
    
    state = {
        searchProduct: false,
        input: '',
        translateMenuValue: -100,
        translateSubmenuValue:  -100,
        rotateIconSubmenuValue: 0,
        marginBottomValue: 47
    }


    
    // Executa a busca com o click na lupa
    searchProductHandler = e => {

        let inputValue = e.currentTarget.parentNode.childNodes[0].value

        if (inputValue.length >= 3) {
            this.setState({
                searchProduct: true, 
                input: inputValue
            })
        } else {
            this.setState({
                input: inputValue
            })
        }
    }

    // Executa a busca com o 'Enter'
    keydownHandler = e => {
        if (e.keyCode === 13) {
            if (this.state.input.length >= 3) {
                this.props.history.push("/search/" + this.state.input)
            } else {
                alert('A busca precisa ter ao menos 3 caracteres')
            }
        }
    }

    componentDidMount(){
        document.addEventListener('keydown',this.keydownHandler)
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.keydownHandler)
    }

    mobileMenuHandler = () => {
        this.state.translateMenuValue === 0 ? 
            this.setState({translateMenuValue: -100}) :
            this.setState({translateMenuValue: 0})
    }

    subMenuHandler = () => {
        this.state.rotateIconSubmenuValue === 0 ?
            this.setState({rotateIconSubmenuValue: -180}) :
            this.setState({rotateIconSubmenuValue: 0})
        

        this.state.translateSubmenuValue === 0 ?
            this.setState({translateSubmenuValue: -100, marginBottomValue: 47}) :
            this.setState({translateSubmenuValue: 0, marginBottomValue: 0})
    }

    


    render () {

        let bag_color = this.props.cart.length > 0 ? 'green' : 'grey'
        let heart_color = this.props.wish.length > 0 ? 'red' : 'grey'

        let search_input = 
            this.state.searchProduct ? 
                <NavLink to={"/search/" + this.state.input}>
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

        const translateMenu = {
            transform: `translateX(${this.state.translateMenuValue}%)`,
            transition: '.8s ease-in-out'
        }

        const translateSubmenu = {
            transform: `translateY(${this.state.translateSubmenuValue}%)`,
            transition: '.8s ease-in-out',
            marginBottom: `-${this.state.marginBottomValue}%`
        }

        const rotateIconSubmenu = {
            transform: `rotate(${this.state.rotateIconSubmenuValue}deg)`,
            transition: `transform 1s`
        }


        return (

            <Fragment>
                <GoogleFontLoader
                    fonts={[
                        {
                        font: 'Lemonada',
                        weights: [],
                        },
                    ]}
                />
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
                                <li>
                                    <input onChange={this.searchProductHandler}/>
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

                    {/* Responsive menu */}
                    <FontAwesomeIcon 
                        onClick={this.mobileMenuHandler}
                        className={classes.Menu_hamburger}
                        icon="bars" color="grey" size="2x" 
                    />
                    <div 
                        className={classes.Navigation_mobile_container}
                        style={translateMenu}>
                        <FontAwesomeIcon 
                            onClick={this.mobileMenuHandler}
                            icon="times" size="2x" 
                        />
                        <ul className={classes.Navigation_mobile_subContainer} >
                            <li>
                                <NavLink 
                                    to="/" 
                                    exact
                                > Home
                                </NavLink>
                            </li>
                            <li className={classes.Navigation_mobile_submenu}>
                                <NavLink 
                                    to="/shop/" 
                                    onClick={this.subMenuHandler}
                                > Shop
                                    <FontAwesomeIcon 
                                        icon="chevron-down" 
                                        style={rotateIconSubmenu} 
                                    />
                                </NavLink>
                                <ul style={translateSubmenu}>
                                    <li>
                                        <NavLink
                                            to="/shop/"
                                            exact
                                        > All categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/shop/bedroom"
                                        > Bedroom
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/shop/living-room"
                                        > Living-room
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/shop/bathroom"
                                        > Bathroom
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/shop/kitchen"
                                        > Kitchen
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink 
                                    to="/contact/" 
                                    exact
                                > Contacts
                                </NavLink>
                            </li>
                        </ul>
                        <div className={classes.Navigation_mobile_contacts} >
                            <div>
                                <h6>CONTACTS</h6>
                                <div>
                                    <p>hello@myhome.com</p>
                                    <p>+375 29 364-74-69</p>
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
                </nav>
                
                <main>
                    { this.props.children }
                </main>
                <Footer></Footer>
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        wish: state.wishlistState,
        cart: state.cartListState
    }
}


export default withRouter(connect(mapStateToProps)(Layout))