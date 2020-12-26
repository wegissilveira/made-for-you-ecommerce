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
                <nav className="navbar-light">
                    <div className={classes.Navbar_container}>
                        <div>
                            {/* <FontAwesomeIcon className="d-md-none" icon="bars" color="grey" size="2x" /> */}
                            {/* Corrigir NavLink. Quando coloco todos os itens da lista com NavLink ao clicar em algum todos são selecionados e o efeito de highlight na página aberta se perde, funcionando somente quando estamos na homepage. Verificar isso quando as as demais páginas além de 'shop' existirem. */}
                            
                            <ul>
                                <li >
                                    <NavLink 
                                        to="/" 
                                        exact={true}
                                        // tag={RRNavLink}
                                    > Home
                                    </NavLink>
                                </li>
                                <li >
                                    <NavLink 
                                        to="/shop/" 
                                        exact={true}
                                        // tag={RRNavLink}
                                    > Shop
                                    </NavLink>
                                </li>
                                <li >
                                    <NavLink 
                                        to="/contact/" 
                                        exact={true}
                                        // tag={RRNavLink}
                                    > Contacts
                                    </NavLink>
                                </li>
                            </ul>

                            {/* Responsive menu */}
                            {/* <FontAwesomeIcon 
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
                                                className="nav-link"
                                            > Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item" style={{overflow: 'hidden'}}>
                                            <NavLink 
                                                to="/shop/" 
                                                exact={true}
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
                                </div>  */}
                        </div>

                        
                        <NavLink
                            to="/" 
                            className={classes.Logo}
                            // style={{ fontFamily: 'Lemonada, cursive' }}
                        > m
                            <span>y</span>Home
                        </NavLink>

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
                                        <FontAwesomeIcon icon={['far', 'heart']} color={ heart_color } />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart/">
                                        <FontAwesomeIcon icon='shopping-bag' color={ bag_color } />
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
                <main>
                    { this.props.children }
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