import React from 'react'

import Products from '../../Shared/Products/Products'
import productsData from '../../../Data/productsData'

import './MainPageProducts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MainPageProducts = props => {

    let [tag, setTag] = React.useState('all')

    const setActiveTabHandler = e => {

        let target = e.target
        let children = e.currentTarget.children
        let childrenArray = Array.from(children)

        // Remove a classe 'products-select-active' de todos os itens children, garantindo que possuam somente 'products-select'
        // A verificação é para garantir que as ações ocorram somente quando as abas forem clicadas e nenhum outro elemento. 
        // Isso é necessário, pois a função 'setActiveTabHandler' está sendo ativada ao clicarmos na div que engloba as abas, portanto se clicarmos em alguma parte fora da aba, como os espaços entre elas por exemplo, as ações ocorreriam diretamente na div e não na aba, o que gera um bug, por isso garantimos que isso não aconteça caso o target seja a div, que recebe como classe a regra 'products-select-container'. Já a primeira verificação é para garantir que a arrow seja removida da equação e também não receba as ações, já que o código procura pelos children e a arrow não possui nenhum, o que retornaria um erro.
        if (target.childNodes[1] && !target.className.match('products-select-container')) {
            childrenArray.map(child => {
                child.className = 'products-select'

                // Seta a arrow e o background branco como 'none' em todos os children.
                Array.from(child.children).map(el => {
                    el.style.display = 'none'
                })

            })
            
            // Adiciona a classe 'products-select-active' no item clicado e seta display 'flex' para o child do mesmo, mostrando assim a arrow e o bg branco.
            target.className = 'products-select products-select-active'
            target.childNodes[1].style.display = 'flex'
        }
    }
    
    // Seleção de aba funcionando perfeitamente, só falta inserir o ícone arrow abaixo da aba selecionada
    return (
        <div className="session-container text-center">
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a category using special switches or go to the section with a convenient filter by product</p>
            <div onClick={(e) => setActiveTabHandler(e)} className="products-select-container d-flex justify-content-between mt-5">

                <div onClick={() => setTag('all')} className="products-select products-select-active">
                    ALL PRODUCTS
                    <p className="justify-content-center mb-0 bg-white">
                        <span className="arrow-down"></span>
                    </p>
                </div>

                <div onClick={() => setTag('furniture')} className="products-select">
                    FURNITURE
                    <p className="justify-content-center mb-0 bg-white">
                        <span className="arrow-down"></span>
                    </p>
                </div>

                <div onClick={() => setTag('decorations')} className="products-select">
                    DECORATIONS
                    <p className="justify-content-center mb-0 bg-white">
                        <span className="arrow-down"></span>
                    </p>
                </div>

                <div onClick={() => setTag('textile')} className="products-select">
                    TEXTILE
                    <p className="justify-content-center mb-0 bg-white">
                        <span className="arrow-down"></span>
                    </p>
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