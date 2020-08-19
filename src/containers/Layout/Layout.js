import React, {Component, Fragment} from 'react'

import Footer from '../../components/Footer/Footer'

import './Layout.css'

import { NavLink as RRNavLink, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleFontLoader from 'react-google-font-loader';

class Layout extends Component {
    

    render () {
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
                
                <nav className="
                        navbar 
                        navbar-expand-sm 
                        navbar-light 
                        
                        d-flex
                        justify-content-between
                    "
                    style={{height: '70px'}}
                >
                    <div className="container-fluid">
                        <div className="
                                col-4 d-flex 
                                justify-content-between 
                                align-items-center
                            "
                        >
                            <FontAwesomeIcon icon="bars" color="grey" size="2x" />
                            {/* Corrigir NavLink. Quando coloco todos os itens da lista com NavLink ao clicar em algum todos são selecionados e o efeito de highlight na página aberta se perde, funcionando somente quando estamos na homepage. Verificar isso quando as as demais páginas além de 'shop' existirem. */}
                            <ul className="navbar-nav">
                                {/* <li className="nav-item">
                                    <a href="/" className="nav-link">Home</a>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink 
                                        to="/shop" 
                                        // exact={true}
                                        // tag={RRNavLink}
                                        className="nav-link"
                                    > Shop
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Sales</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Shopping</a>
                                </li> 
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Contacts</a>
                                </li>
                            </ul>
                        </div>

                        <NavLink
                            to="/" 
                            className="navbar-brand"
                            style={{ fontFamily: 'Lemonada, cursive' }}
                        > m
                            <span className="text-warning">y</span>Home
                        </NavLink>

                        <div className="col-4 d-flex justify-content-between">
                            <p className="mb-0">+375 29 364-74-69</p>

                            <ul className="navbar-nav account-icons">
                                <li className="nav-item">
                                    <FontAwesomeIcon icon="search" color="grey" /></li>
                                <li className="nav-item">
                                    <FontAwesomeIcon icon={['far', 'user']} color="grey" />
                                </li>
                                <li className="nav-item">
                                    <FontAwesomeIcon icon={['far', 'heart']} color="grey" />
                                </li>
                                <li className="nav-item">
                                    <FontAwesomeIcon icon='suitcase' color="grey" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
                <main>
                    {this.props.children}
                </main>
                <Footer>

                </Footer>
            </Fragment>
        )
    }
}

export default Layout