import React, {Component, Fragment} from 'react'

import Footer from '../../components/Footer/Footer'
import SearchProduct from '../../components/SearchProduct/SearchProduct'

import './Layout.css'

import { NavLink as RRNavLink, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GoogleFontLoader from 'react-google-font-loader'

class Layout extends Component {
    
    // Preciso encontrar uma maneira de setar 'searchProduct' como false após a busca ou pelo menos quando algum link for clicado
    // Os links não estão funcionando e não é possível sair da página, pois após realizar a busca 'searchProduct' continua sendo 'true'
    // Eu pensei em verificar a url, mas ela não sofre nenhuma alteração no momento da busca, ela manté mantida como estava anteriormente, então não há padrão para utilizar como referência
    // Também considerei a ideia de verificar se houve alteração na url, mas isso seria um problema quando o usuário quiser apensas voltar para a página anterior. Apesar de que seria possível com o botão voltar do browser, comprometeria a UI.
    // Pensei em criar um método para isso, mas a única maneira que pensei por enquanto é a de inserir tal método em todos os links, não sei se é a melhor maneira, procurarei outra, caso não encontre será a solução, ainda que não muito atraente.
    // Talvez acrescentando uma variável aumentaria as possibilidades, mas por ora não tenho ideia de como aproveitar isso
    // Talvez haja uma maneira de verificar se o 'Link' recebeu um click, se foi ativado, caso isso seja possível resolveria o problema. VERIFICAR ISSO COMO PRIMEIRA HIPÓTESE DE SOLUÇÃO.
    state = {
        searchProduct: false,
        input: ''
    }


    searchProductHandler = e => {
        let inputValue = e.currentTarget.parentElement.childNodes[0].value
        
        if (inputValue.length >= 3) {
            this.setState({
                searchProduct: true, 
                input: inputValue
            })
        } else {
            alert('Digite ao menos 3 letras no campo de busca')
        }

    }



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
                                <li className="nav-item d-flex align-items-center" >
                                    <input />
                                    <FontAwesomeIcon 
                                        icon="search" 
                                        color="grey" 
                                        style={{cursor: 'pointer'}} 

                                        onClick={this.searchProductHandler}
                                    />
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
                    {
                        this.state.searchProduct ? 
                            <SearchProduct 
                                searchKey={this.state.input} 
                                pageLimit={12}
                            /> 
                        : 
                            this.props.children
                    }
                </main>
                <Footer>

                </Footer>
            </Fragment>
        )
    }
}

export default Layout