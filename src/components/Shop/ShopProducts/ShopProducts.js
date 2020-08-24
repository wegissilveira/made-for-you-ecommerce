import React from 'react'

import Products from '../../Shared/Products'
import Filter from '../Filter/Filter'
import BestDeal from '../BestDeal/BestDeal'

const ShopProducts = props => {

    let [tag, setTag] = React.useState('all')

    let products = [
        {
            name: 'Produto-1',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Textile/img-1.png'),
                require('../../../assets/images/ProductCard/Textile/img-2.png'),
                require('../../../assets/images/ProductCard/Textile/img-3.png'),
            ]
        },
        {
            name: 'Produto-2',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-3',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Decorations/img-1.png'),
                require('../../../assets/images/ProductCard/Decorations/img-2.png'),
                require('../../../assets/images/ProductCard/Decorations/img-3.png'),
            ]
        },
        {
            name: 'Produto-4',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-5',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Decorations/img-1.png'),
                require('../../../assets/images/ProductCard/Decorations/img-2.png'),
                require('../../../assets/images/ProductCard/Decorations/img-3.png'),
            ]
        },
        {
            name: 'Produto-6',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-7',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Textile/img-1.png'),
                require('../../../assets/images/ProductCard/Textile/img-2.png'),
                require('../../../assets/images/ProductCard/Textile/img-3.png'),
            ]
        },
        {
            name: 'Produto-8',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-9',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Textile/img-1.png'),
                require('../../../assets/images/ProductCard/Textile/img-2.png'),
                require('../../../assets/images/ProductCard/Textile/img-3.png'),
            ]
        },
        {
            name: 'Produto-10',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Decorations/img-1.png'),
                require('../../../assets/images/ProductCard/Decorations/img-2.png'),
                require('../../../assets/images/ProductCard/Decorations/img-3.png'),
            ]
        },
        {
            name: 'Produto-11',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Decorations/img-1.png'),
                require('../../../assets/images/ProductCard/Decorations/img-2.png'),
                require('../../../assets/images/ProductCard/Decorations/img-3.png'),
            ]
        },
        {
            name: 'Produto-12',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-13',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-14',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-furniture.png'),
            tag: 'furniture',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Furniture/img-1.png'),
                require('../../../assets/images/ProductCard/Furniture/img-2.png'),
                require('../../../assets/images/ProductCard/Furniture/img-3.png'),
            ]
        },
        {
            name: 'Produto-15',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-textile.png'),
            tag: 'textile',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Textile/img-1.png'),
                require('../../../assets/images/ProductCard/Textile/img-2.png'),
                require('../../../assets/images/ProductCard/Textile/img-3.png'),
            ]
        },
        {
            name: 'Produto-16',
            price: '38.99',
            img: require('../../../assets/images/Products/molde-decorations.png'),
            tag: 'decorations',
            imgsDemo: [
                require('../../../assets/images/ProductCard/Decorations/img-1.png'),
                require('../../../assets/images/ProductCard/Decorations/img-2.png'),
                require('../../../assets/images/ProductCard/Decorations/img-3.png'),
            ]
        },
    ]

    return (
        <div>
            <h1 className="text-center mb-5 mt-5">SHOP</h1>
            <Filter />
            <Products 
                products={products} 
                pageLimit={12} 
                tag={tag}
            />
            <BestDeal />
        </div>
    )
}

export default ShopProducts