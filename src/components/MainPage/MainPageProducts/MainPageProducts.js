import React from 'react'

import Products from '../../Shared/Products'

import './MainPageProducts.css'


const MainPageProducts = props => {

    let [tag, setTag] = React.useState('all')

    let products = [
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile'
        },
        {
            name: 'Produto',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations'
        },
    ]

    const setActiveTabHandler = e => {

        let target = e.target
        let children = e.currentTarget.children
        let childrenArray = Array.from(children)

        childrenArray.map(child => {
            child.className = 'products-select'
        })
        
        target.className = 'products-select products-select-active'

    }
    
    // Seleção de aba funcionando perfeitamente, só falta inserir o ícone arrow abaixo da aba selecionada
    return (
        <div className="session-container text-center">
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a category using special switches or go to the section with a convenient filter by product</p>
            <div onClick={(e) => setActiveTabHandler(e)} className="products-select-container d-flex justify-content-between mt-5">
                <p onClick={() => setTag('all')} className="products-select products-select-active">ALL PRODUCTS</p>
                <p onClick={() => setTag('furniture')} className="products-select">FURNITURE</p>
                <p onClick={() => setTag('decorations')}  className="products-select">DECORATIONS</p>
                <p onClick={() => setTag('textile')}  className="products-select">TEXTILE</p>
            </div>
            <Products 
                products={products} 
                pageLimit={8} 
                tag={tag}
            />
        </div>
    )
}

export default MainPageProducts