import React, {Component, Fragment} from 'react'

import classes from './Layout.module.css'

import Footer from '../../components/Footer/Footer'

import { NavLink } from 'react-router-dom'
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
        rotateIconSubmenuValue: 0
    }


    
    // Executa a busca com o click na lupa
    // O botão de busca só é habilitado em caso do input receber ao menos 3 caracteres
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

        this.setState({translateSubmenuValue: -100})
        this.setState({rotateIconSubmenuValue: 0})
        this.setState({showSubMenu: false})

    }

    subMenuHandler = () => {
        this.state.rotateIconSubmenuValue === 0 ?
        this.setState({rotateIconSubmenuValue: -180}) :
        this.setState({rotateIconSubmenuValue: 0})
        

        this.state.translateSubmenuValue === 0 ?
        this.setState({translateSubmenuValue: -100}) :
        this.setState({translateSubmenuValue: 0})
    }

    


    render () {

        const translateMenu = {
            transform: `translateX(${this.state.translateMenuValue}%)`,
            transition: '.8s ease-in-out'
        }

        const translateSubmenu = {
            transform: `translateY(${this.state.translateSubmenuValue}%)`,
            transition: '.8s ease-in-out'
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
                        // {
                        // font: 'Roboto Mono',
                        // weights: [400, 700],
                        // },
                    ]}
                    // subsets={['cursive']}
                />
                {/* navbar-expand-md  */}
                <nav className="
                        navbar 
                        navbar-expand-md
                        navbar-light 
                        
                        d-flex
                        justify-content-between
                    "
                    style={{height: '70px'}}
                >
                    <div className="container-fluid">
                        <div className="
                                col-4 
                                d-flex 
                                justify-content-between 
                                align-items-center
                            "
                        >
                            {/* <FontAwesomeIcon className="d-md-none" icon="bars" color="grey" size="2x" /> */}
                            {/* Corrigir NavLink. Quando coloco todos os itens da lista com NavLink ao clicar em algum todos são selecionados e o efeito de highlight na página aberta se perde, funcionando somente quando estamos na homepage. Verificar isso quando as as demais páginas além de 'shop' existirem. */}
                            
                            <ul className="navbar-nav d-none d-md-flex" style={{marginLeft: '28%'}}>
                                <li className="nav-item">
                                    <NavLink 
                                        to="/" 
                                        exact={true}
                                        // tag={RRNavLink}
                                        className="nav-link"
                                    > Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to="/shop/" 
                                        exact={true}
                                        // tag={RRNavLink}
                                        className="nav-link"
                                    > Shop
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        to="/contact/" 
                                        exact={true}
                                        // tag={RRNavLink}
                                        className="nav-link"
                                    > Contacts
                                    </NavLink>
                                </li>
                            </ul>

                            {/* Responsive menu */}
                            <FontAwesomeIcon 
                                onClick={this.mobileMenuHandler}
                                className="d-md-none" 
                                icon="bars" color="grey" size="2x" 
                            />
                                <div className={`d-md-none ${classes.Navigation_mobile}`}
                                style={translateMenu}>
                                    <FontAwesomeIcon 
                                        onClick={this.mobileMenuHandler}
                                        icon="times" size="2x" 
                                    />
                                    <ul className={`navbar-nav ${classes.Navigation_mobile_main_list}`} >
                                        <li className="nav-item">
                                            <NavLink 
                                                to="/" 
                                                exact={true}
                                                // tag={RRNavLink}
                                                className="nav-link"
                                            > Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item" style={{overflow: 'hidden'}}>
                                            <NavLink 
                                                to="/shop/" 
                                                exact={true}
                                                // tag={RRNavLink}
                                                className={`nav-link ${classes.Navigation_mobile_submenu_shop}`}
                                                onClick={this.subMenuHandler}
                                            > Shop
                                                <FontAwesomeIcon icon="chevron-down" style={rotateIconSubmenu} />
                                            </NavLink>
                                                <ul 
                                                    className={`navbar-nav ${classes.Navigation_mobile_sub_list}`} 
                                                    style={translateSubmenu}
                                                >
                                                    <li className="nav-item">
                                                        <NavLink
                                                            to="/shop/"
                                                            exact={true}
                                                            className="nav-link"
                                                        >
                                                            All categories
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink
                                                            to="/shop/bedroom"
                                                            exact={true}
                                                            className="nav-link"
                                                        >
                                                            Bedroom
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink
                                                            to="/shop/living-room"
                                                            exact={true}
                                                            className="nav-link"
                                                        >
                                                            Living-room
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink
                                                            to="/shop/bathroom"
                                                            exact={true}
                                                            className="nav-link"
                                                        >
                                                            Bathroom
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink
                                                            to="/shop/kitchen"
                                                            exact={true}
                                                            className="nav-link"
                                                        >
                                                            Kitchen
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink 
                                                to="/contact/" 
                                                exact={true}
                                                // tag={RRNavLink}
                                                className="nav-link"
                                            > Contacts
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <div className={classes.Navigation_mobile_contacts} >
                                        <div className="d-flex flex-column mb-4">
                                            <h6>CONTACTS</h6>
                                            <div>
                                                <p>hello@myhome.com</p>
                                                <p>+375 29 364-74-69</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column mb-4">
                                            <h6>STAY SOCIAL</h6>
                                            <div className={`${classes.Navigation_mobile_staySocial_icons}`}>
                                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                                                <FontAwesomeIcon icon={['fab', 'vk']} />
                                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                                                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                        </div>

                        
                            <NavLink
                                to="/" 
                                className={`navbar-brand ${classes.Logo}`}
                                // className="navbar-brand"
                                // style={{ fontFamily: 'Lemonada, cursive' }}
                            > m
                                <span className="text-warning">y</span>Home
                            </NavLink>

                            {<div className="col-4 d-none d-md-block">
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">+375 29 364-74-69</p>

                                <ul className={`navbar-nav ${classes.Account_icons}`}>
                                    <li className="nav-item d-flex align-items-center" >
                                        <input onChange={this.searchProductHandler}/>
                                        {
                                            this.state.searchProduct ? 
                                            
                                                <NavLink to={"/search/" + this.state.input}>
                                                    <FontAwesomeIcon 
                                                        icon="search" 
                                                        color="grey" 
                                                        style={{cursor: 'pointer'}} 

                                                        
                                                    />
                                                </NavLink>
                                            :
                                                <FontAwesomeIcon 
                                                    icon="search" 
                                                    color="grey" 
                                                    style={{cursor: 'pointer'}} 

                                                    onClick={() => alert('A busca precisa ter ao menos 3 caracteres')}
                                                /> 
                                        }
                                    </li>
                                    <li className="nav-item">
                                        <FontAwesomeIcon icon={['far', 'user']} color="grey" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/wishlist/"
                                        >
                                            {   this.props.wish.length > 0 ?
                                                    <FontAwesomeIcon icon={['far', 'heart']} color="red" />
                                                :
                                                    <FontAwesomeIcon icon={['far', 'heart']} color="grey" />
                                            }
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/cart/"
                                        >
                                            {   this.props.cart.length > 0 ?
                                                    <FontAwesomeIcon icon='shopping-bag' color="green" />
                                                :
                                                    <FontAwesomeIcon icon='shopping-bag' color="grey" />
                                            }
                                        </NavLink>
                                    </li>
                                </ul>
                                {/* <ul className={`navbar-nav ${classes.Enter_account_container}`}>
                                    <li className="nav-item">
                                        <FontAwesomeIcon icon="search" />
                                    </li>
                                    <NavLink
                                        className={classes.Enter_account_btn}
                                        to="/user-login/"
                                    >
                                        <p>Login</p>
                                    </NavLink>
                                    <NavLink
                                        className={classes.Enter_account_btn}
                                        to="/user-signup/"
                                    >
                                        <p>Sign up</p>
                                    </NavLink>
                                </ul> */}
                            </div>
                        </div>}
                    </div>
                </nav>
                
                <main>
                    {
                        this.props.children
                    }
                </main>
                <Footer>

                </Footer>
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