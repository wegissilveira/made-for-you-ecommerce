import React, { Fragment } from 'react'

import classes from './Products.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductCardModal from '../../Shop/ProductCardModal/ProductCardModal'
import * as actionTypes from '../../../store/actions/actionTypes'

import productsData from '../../../Data/productsData' 
import wishlistDataFn from '../../../Data/wishlistData';
import cartListDataFn from '../../../Data/cartData';


const Products = props => {

    let [count, setCount] = React.useState(props.pageLimit)
    let [pageLimit, setPageLimit] = React.useState(props.pageLimit)
    let [showProduct, setShowProduct] = React.useState(false)
    let [productIndex, setProductIndex] = React.useState(null)
    let [prodExistsCart, setProdExistsCart] = React.useState([])
    
    React.useEffect(() => {
        let productCartArr = [...props.cart]

        let productsCartIDs = []
        productCartArr.forEach(item => {
            productsData.forEach(product => {
                if (item._id === product._id) {
                    productsCartIDs.push(item._id)
                }
            })
            
        })

        setProdExistsCart(productsCartIDs)

    }, [props.cart])

    
    if (count === undefined) {
        setCount(8)
    }

    if (pageLimit === undefined) {
        setPageLimit(8)
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

    const wishlistHandler = id => {

        let list = [...props.wish]
        if (list.includes(id)) {
            list = list.filter(item => item !== id)
        } else {
            list.push(id)
        }
        
        localStorage.setItem('wishlist', JSON.stringify(list))

        props.onWishlistState() 
    }

    const cartHandler = product => {

        let cartList = [...props.cart]
        let productsCartIDs = [...prodExistsCart]

        let count = 0
        cartList.forEach(item => {
            if (item._id === product._id) count++
        })
        
        if (count === 0) {
            let productCart = {}

            productCart._id = product._id
            productCart.qtde = 1
            productCart.color = product.colors[0]
            productCart.size = '100x100'
    
            cartList.push(productCart)
            productsCartIDs.push(product._id)

        } else {
            cartList = cartList.filter(item => item._id !== product._id)
            productsCartIDs = productsCartIDs.filter(item => item !== product._id)
        }      
        
        setProdExistsCart(productsCartIDs)

        localStorage.setItem('cartList', JSON.stringify(cartList))

        props.onCartListState()
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
                ));
            }
        }
    }

    const openModalHandler = i => {
        setShowProduct(!showProduct)
        setProductIndex(i)
    }

    const closeModalCallback = () => {
        setShowProduct(!showProduct)
    }

    if (showProduct === true) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "visible"
    }

    const url_string = window.location.href
    const url = new URL(url_string);

    const products_container = 
        url.pathname === '/shop/' ? 
            {width: '100%', margin: '0'} : 
            classes.Products_container
        
    return (
        <Fragment>
            <div className={products_container}>
                {props.match && props.match.params.cat ? <h1>{category.toUpperCase()}</h1> : null}
                {props.match && props.match.params.searchKey ? <h1>BUSCA: '{props.match.params.searchKey.toUpperCase()}'</h1> : null}
                <div className={classes.Products_subContainer}>
                    {products.length > 0 ?
                        products.map((product, i) => {
                            let productsList
                            if (i + 1 <= count) {
                                if (tag === 'all-products' || product.tag === tag) {
                                    if (category === 'all' || product.category === category) {
                                        const wish_icon = props.wish.includes(product._id) ? 'fas' : 'far'
                                        const bag_icon_color = prodExistsCart.includes(product._id) ?
                                            classes.Wishlist_icon_bag_selected :
                                            classes.Wishlist_icon_bag

                                        productsList = <Fragment key={product+i}>
                                                            <div>
                                                                <div>
                                                                    <FontAwesomeIcon 
                                                                        onClick={() => wishlistHandler(product._id)} 
                                                                        icon={[wish_icon, 'heart']} size="2x" 
                                                                        className={classes.Wishlist_icon_heart} 
                                                                    />
                                                                    <Link to={"/shop/product/" + product._id} >
                                                                        <div className={classes.Products_img_container}>
                                                                            <img 
                                                                                src={product.img} 
                                                                                alt="Produto" 
                                                                            />
                                                                        </div>
                                                                    </Link>
                                                                    <div className={classes.Products_description}>
                                                                        <div>
                                                                            <Link to={"/shop/product/" + product._id}>{product.name}</Link>
                                                                            <p>$ {product.price}</p>
                                                                        </div>
                                                                        <div>
                                                                            <FontAwesomeIcon 
                                                                                onClick={() => openModalHandler(i)} 
                                                                                icon="eye" 
                                                                            />
                                                                            <FontAwesomeIcon
                                                                                onClick={() => cartHandler(product)}
                                                                                icon="shopping-bag" size="2x"
                                                                                className={bag_icon_color} 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                            { productIndex === i ? 
                                                                <ProductCardModal 
                                                                    showProduct={showProduct}
                                                                    setShowProduct={closeModalCallback}
                                                                    product={product} 
                                                                    wishlist={props.wish}
                                                                    imgs={product.imgsDemo} 
                                                                    name={product.name}
                                                                /> 
                                                            : null }
                                                        </Fragment>
                                    }
                                }
                            }
                            return productsList
                        })
                    : <h1 className="text-center" style={{width: '100%'}}>NENHUM ITEM NA ENCONTRADO</h1>}

                </div>
                <div className={classes.Products_show_container}>
                    <div className={classes.Products_show_subContainer}>
                        <div>
                            <button 
                                disabled={count >= products.length} 
                                type="button" 
                                onClick={() => setCount(count + 4)}
                                > SHOW MORE
                            </button>
                        </div>
                    </div>
                    <div className={classes.Products_show_subContainer}>
                        <div>
                            <button 
                                disabled={count <= pageLimit || products.length <= pageLimit} 
                                type="button" 
                                onClick={() => setCount(count - 4)}
                                > SHOW LESS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


const mapStateToProps = state => {
    return {
        wish: state.wishlistState,
        cart: state.cartListState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWishlistState: () => dispatch({type: actionTypes.WISHLIST, value: wishlistDataFn()}),
        onCartListState: () => dispatch({type: actionTypes.CARTLIST, value: cartListDataFn()})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)