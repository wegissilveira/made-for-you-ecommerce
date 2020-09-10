import React, {Component, Fragment} from 'react'

import Footer from '../../components/Footer/Footer'

import './Layout.css'

import { NavLink as RRNavLink, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleFontLoader from 'react-google-font-loader';

class Layout extends Component {
    

    // O que farei é criar um método para realizar as buscas utilizando o código que já tenho no arqui es6fund.
    // O que tenho que decidir é como vou exibir os produtos.
    // Uma opção é remover todo o conteúdo de 'main', que se trata de tudo que está entre o navigation e o footer, e inserir um componente no lugar com os resultados da busca, assim somente as buscas apareceriam quando houver resultado. 
    // Não sei se seria possível direcionar o usuário para a página do produto, já que os demais componentes estariam supostamente desativados.
    // Uma outra opção também seria utilizar o componente 'Products', mas isso o deixaria ainda mais complexo.
    // Talvez eu possa criar um componente a parte, mas não desabilitar os demais, nesse caso eu teria que encontrar uma maneira de fazer com que eles funcionem juntos sem comprometer a UI e a UX.

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
                                        to="/shop/" 
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
                                {/* <li className="nav-item">
                                    <a href="/" className="nav-link">Contacts</a>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink 
                                        to="/contact/" 
                                        // exact={true}
                                        // tag={RRNavLink}
                                        className="nav-link"
                                    > Contacts
                                    </NavLink>
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
                                <li className="nav-item d-flex align-items-center">
                                    <input />
                                    <FontAwesomeIcon icon="search" color="grey" style={{cursor: 'pointer'}} />
                                </li>
                                <li className="nav-item">
                                    <FontAwesomeIcon icon={['far', 'user']} color="grey" />
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/wishlist/"
                                    >
                                        <FontAwesomeIcon icon={['far', 'heart']} color="grey" />
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/cart/"
                                    >
                                        <FontAwesomeIcon icon='suitcase' color="grey" />
                                    </NavLink>
                                </li>
                            </ul>
                            {/* <ul className="navbar-nav account-icons account-icons-enter">
                                <li className="nav-item">
                                    <FontAwesomeIcon icon="search" />
                                </li>
                                <NavLink
                                    className="enter-btn"
                                    to="/user-login/"
                                >
                                    <p>Login</p>
                                </NavLink>
                                <NavLink
                                    className="enter-btn"
                                    to="/user-signup/"
                                >
                                    <p>Sign up</p>
                                </NavLink>
                            </ul> */}
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