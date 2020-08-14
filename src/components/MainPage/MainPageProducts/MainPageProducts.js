import React from 'react'

import Products from '../Shared/Products'

import './MainPageProducts.css'


const mainPageProducts = props => {

    return (
        <div className="session-container text-center">
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a catecory using special switches or go to the section with a convenient filter by product</p>
            <div className="products-select-container d-flex justify-content-between mt-5">
                <p className="products-select">ALL PRODUCTS</p>
                <p className="products-select">FURNITURE</p>
                <p className="products-select">DECORATION</p>
                <p className="products-select">TEXTILE</p>
            </div>
            <Products />
        </div>
    )
}

export default mainPageProducts