import React, { Fragment } from 'react'

import classes from './Products.module.css'

import { connect } from 'react-redux'

import ProductCard from './ProductCard/ProductCard';
import productsData from '../../../Data/productsData' 
import * as actionTypes from '../../../store/actions/actionTypes'
import wishlistDataFn from '../../../Data/wishlistData';


const Products = props => {

    let [count, setCount] = React.useState(props.pageLimit)
    let [pageLimit, setPageLimit] = React.useState(props.pageLimit)

    const productsContainerRef = React.useRef()
    
    if (count === undefined) {
        setCount(8)
    }

    if (pageLimit === undefined) {
        setPageLimit(8)
    }

    let [top, setTop] = React.useState()

    const setProductsPageHandler = arg => {
        const el = productsContainerRef.current
        let elBottom = el.offsetTop + el.offsetHeight
        let newCount
        
        if (arg === 'more') {
            newCount = count + 4
        } else {
            elBottom = top - 460
            newCount = count - 4
        }

        window.scrollTo({top: elBottom - 280, left: 0, behavior: 'smooth'})
        setTop(elBottom)
        setCount(newCount)
    }

    let tag
    let category
    if (props.tag && props.category) {
        tag = props.tag
        category = props.category
    } else if (props.match) {
        tag = 'all-products'
        category = props.match.params.cat
    } else if (props.tag) {
        tag = props.tag
        category = 'all'
    } else if (props.category) {
        tag = 'all-products'
        category = props.category
    } else {
        tag = 'all-products'
        category = 'all'
    }

    let products = []
    if (props.match && props.match.params.searchKey) {
        let searchKey = new RegExp(props.match.params.searchKey, 'gi') 

        productsData.forEach(product => {
            for (let i in product) {
                if (i !== 'imgsDemo' && i !== 'img' && i !== 'deal') {
                    if (product[i].toString().match(searchKey)) {
                        products.push(product)
                    }
                }

            }
        })
        
        category = 'all'

    } else {
        
        if (props.wishlist) {
            products = productsData.filter(product => props.wish.includes(product._id))
            
        } else {
            
            if (tag === 'all-products' && category === 'all') {
                products = productsData
    
            } else if (tag === 'all-products' && category !== 'all') {
                products = productsData.filter(item => item.category === category)
    
            } else if (tag !== 'all-products' && category === 'all') {
                products = productsData.filter(item => item.tag === tag)
            
            } else if (tag !== 'all-products' && category !== 'all') {
                products = productsData.filter(item => item.tag === tag)
                products = products.filter(item => item.category === category)
    
            }
        }

        if (props.valueRange) {
            products = products.filter(product => 
                parseFloat(product.price) >= props.valueRange[0] && parseFloat(product.price) <= props.valueRange[1]
            )
        }

        if (props.productColor && props.productColor !== '') {
            products = products.filter(product => 
                product.colors.includes(props.productColor)
            )
        }

        if (props.offer && props.offer.length > 0) {
            products = products.filter(product => 
                props.offer.includes(product.offer))
        }
    
        if (props.order) {
            if (props.order === 'low-high') {
                products.sort((a,b) => parseFloat(a.price) - parseFloat(b.price))
            } else if (props.order === 'high-low') {
                products.sort((a,b) => parseFloat(b.price) - parseFloat(a.price))
            } else if (props.order === 'alphabetical') {
                products.sort((a, b) => a.name.localeCompare(
                    b.name,
                    undefined,
                    { numeric: true, sensitivity: 'base' }
                ))
            }
        }
    }

    const url_string = window.location.href
    const url = new URL(url_string);

    const products_container = 
        url.pathname === '/shop/' ? 
            {width: '100%', margin: '0'} : 
            classes.Products_container

        
    return (
        <Fragment>
            <div ref={productsContainerRef} className={products_container}>
                {props.match && props.match.params.cat ? <h1>{category.toUpperCase()}</h1> : null}
                {props.match && props.match.params.searchKey ? <h1>BUSCA: '{props.match.params.searchKey.toUpperCase()}'</h1> : null}
                <div className={classes.Products_subContainer}>
                    {products.length > 0 ?
                        products.map((product, i) => {
                            let productsList
                            if (i + 1 <= count) {
                                if (tag === 'all-products' || product.tag === tag) {
                                    if (category === 'all' || product.category === category) {
                                        productsList = 
                                            <ProductCard 
                                                key={product+i} 
                                                product={product} 
                                                index={i} 
                                            />
                                    }
                                }
                            }
                            return productsList
                        })
                    : 
                        <h1 className="text-center" style={{width: '100%'}}>NENHUM ITEM ENCONTRADO</h1>}
                </div>

                <div className={classes.Products_show_container}>
                    <div className={classes.Products_show_subContainer}>
                        <div>
                            <button 
                                disabled={count >= products.length} 
                                type="button" 
                                onClick={() => setProductsPageHandler('more')}
                                > SHOW MORE
                            </button>
                        </div>
                    </div>
                    <div className={classes.Products_show_subContainer}>
                        <div>
                            <button 
                                disabled={count <= pageLimit || products.length <= pageLimit} 
                                type="button" 
                                onClick={() => setProductsPageHandler('less')}
                                > SHOW LESS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

// export default Products

const mapStateToProps = state => {
    return {
        wish: state.wishlistState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWishlistState: () => dispatch({type: actionTypes.WISHLIST, value: wishlistDataFn()})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)