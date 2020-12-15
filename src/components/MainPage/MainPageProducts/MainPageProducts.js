import React from 'react'

import classes from './MainPageProducts.module.css'

import Products from '../../Shared/Products/Products'
import productsData from '../../../Data/productsData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MainPageProducts = props => {
    
    let [tag, setTag] = React.useState('all-products')
    let [menuTitleWidth, setMenuTitleWidth] = React.useState('55')

    let menuTitle = tag !== 'all-products' ? tag : 'all products'

    const setActiveTabHandler = (e, screen) => {

        let target = e.target
        let children = e.currentTarget.children
        let childrenArray = Array.from(children)

        // Remove a classe 'Products_select_container' de todos os itens children, garantindo que possuam somente 'Products_select'
        // A verificação é para garantir que as ações ocorram somente quando as abas forem clicadas e nenhum outro elemento. 
        // Isso é necessário, pois a função 'setActiveTabHandler' está sendo ativada ao clicarmos na div que engloba as abas, portanto se clicarmos em alguma parte fora da aba, como os espaços entre elas por exemplo, as ações ocorreriam diretamente na div e não na aba, o que gera um bug, por isso garantimos que isso não aconteça caso o target seja a div, que recebe como classe a regra 'products-select-container'. Já a primeira verificação é para garantir que a arrow seja removida da equação e também não receba as ações, já que o código procura pelos children e a arrow não possui nenhum, o que retornaria um erro.
        if (target.childNodes[1] && !target.className.match('Products_select_container') && screen !== 'mobile') { 
            childrenArray.forEach(child => {
                child.className = classes.Products_select

                // Seta a arrow e o background branco como 'none' em todos os children.
                Array.from(child.children).forEach(el => {
                    el.style.display = 'none'
                })
                
            })
            
            // Adiciona a classe 'products-select-active' no item clicado e seta display 'flex' para o child do mesmo, mostrando assim a arrow e o bg branco.
            target.className = [classes.Products_select, classes.Products_select_active].join(' ')
            target.childNodes[1].style.display = 'flex'
        }

        if (screen === 'mobile' && target.tagName === 'P') {
            childrenArray.forEach(child => {
                child.className = ''    
            })
            
            target.className = classes.Products_select_mobile_active
            
            setMenuTitleWidth(target.children[0].offsetWidth / 2)
        }        
    }

    const toggleMenu = e => {
        const menu = e.currentTarget.parentNode.children[1]

        menu.style.display === 'flex' ?
            menu.style.display = 'none' :
            menu.style.display = 'flex'
    }
    
    // Seleção de aba funcionando perfeitamente, só falta inserir o ícone arrow abaixo da aba selecionada
    return (
        <div className={classes.Session_container}>
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a category using special switches or go to the section with a convenient filter by product</p>
            <div 
                onClick={(e) => setActiveTabHandler(e)} 
                className={classes.Products_select_container}
            >
                <div 
                    onClick={() => setTag('all-products')} 
                    className={[
                        classes.Products_select, 
                        classes.Products_select_active].join(' ')
                    }
                > ALL PRODUCTS
                    <p> <span></span> </p>
                </div>

                <div 
                    onClick={() => setTag('furniture')} 
                    className={classes.Products_select}
                > FURNITURE
                    <p> <span></span> </p>
                </div>

                <div 
                    onClick={() => setTag('decorations')} 
                    className={classes.Products_select}
                > DECORATIONS
                    <p> <span></span> </p>
                </div>

                <div 
                    onClick={() => setTag('textile')} 
                    className={classes.Products_select}
                > TEXTILE
                    <p> <span></span> </p>
                </div>
            </div>

            <div className={classes.Products_select_container_mobile}>
                <div 
                    onClick={e => toggleMenu(e)}
                    style={{paddingLeft: `calc(50% - ${menuTitleWidth}px)`}}
                >
                    <p>{menuTitle.toUpperCase()}</p>
                    <FontAwesomeIcon icon="chevron-down" />
                </div>
                <div onClick={(e) => setActiveTabHandler(e, 'mobile')} >
                    {/* <p
                        className={classes.Products_select_mobile_active}
                        onClick={() => setTag('all-products')} 
                    > ALL PRODUCTS
                    </p>
                    <p onClick={() => setTag('furniture')}>FURNITURE</p>
                    <p onClick={() => setTag('decorations')}>DECORATIONS</p>
                    <p onClick={() => setTag('textile')}>TEXTILE</p> */}
                    <p
                        className={classes.Products_select_mobile_active}
                        onClick={() => setTag('all-products')} 
                    > <span>ALL PRODUCTS</span>
                    </p>
                    <p onClick={() => setTag('furniture')}><span>FURNITURE</span></p>
                    <p onClick={() => setTag('decorations')}><span>DECORATIONS</span></p>
                    <p onClick={() => setTag('textile')}><span>TEXTILE</span></p>
                </div>
            </div>

            <Products 
                products={productsData} 
                pageLimit={8} 
                tag={tag}
            />
        </div>
    )
}

export default MainPageProducts