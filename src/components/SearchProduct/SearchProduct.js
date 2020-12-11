import React, {Fragment} from 'react'

import classes from './SearchProduct.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductCardModal from '../Shop/ProductCardModal/ProductCardModal'
import * as actionTypes from '../../store/actions/actionTypes'

import productsData from '../../Data/productsData' 


const SearchProduct = props => {
    
    const pageLimit = 12
    let [count, setCount] = React.useState(pageLimit)
    let [showProduct, setShowProduct] = React.useState(false)
    let [productIndex, setProductIndex] = React.useState(null)


    let products = []
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
    
    const setCard = i => {
        setShowProduct(!showProduct)
        setProductIndex(i)
    }

    if (showProduct === true) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "visible"
    }

    let [prodExistsCart, setProdExistsCart] = React.useState([])
    
    React.useEffect(() => {
        // let productCartArr = [...cartState]
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

    console.log(props.match.params.searchKey)
    return (
        <Fragment>
            <div className="session-container container">
                <h2 className="text-center">Search Results</h2>
                <div className="row">
                    {products.length > 0 ?
                        products.map((product, i) => {

                            let productsList
                            if (i + 1 <= count) {
                                productsList = <Fragment key={product+i}>
                                                    <div className=" col-3 mt-4 pl-0">
                                                        <div className="border p-0">
                                                        {   props.wish.includes(product._id) ?
                                                                <FontAwesomeIcon 
                                                                    // onClick={() => wishlistHandler(product._id)} 
                                                                    className={classes.Wishlist_icon_heart} 
                                                                    icon={['fas', 'heart']} size="2x" 
                                                                />
                                                            :
                                                                <FontAwesomeIcon 
                                                                    // onClick={() => wishlistHandler(product._id)} 
                                                                    className={classes.Wishlist_icon_heart} 
                                                                    icon={['far', 'heart']} size="2x" 
                                                                />
                                                        }
                                                            <Link to={"/shop/product/" + product._id} >
                                                                <div 
                                                                    style={{height: '359px', backgroundColor: '#F6F6F6'}} 
                                                                    className="d-flex align-items-center"
                                                                >
                                                                    <img 
                                                                        src={product.img} alt="Produto" 
                                                                        style={{maxWidth: '100%'}} 
                                                                    />
                                                                </div>
                                                            </Link>
                                                            <div className={classes.Products_description}>
                                                                <div className={classes.Products_description_name}>
                                                                    <p>{product.name}</p>
                                                                    <p>$ {product.price}</p>
                                                                </div>
                                                                <div className={classes.Products_description_icons}>
                                                                    <FontAwesomeIcon 
                                                                        icon="eye" 
                                                                        className={classes.Products_description_eye} 
                                                                    />

                                                                   {
                                                                        prodExistsCart.includes(product._id) ?
                                                                            <FontAwesomeIcon 
                                                                                // onClick={() => cartHandler(product)}
                                                                                className={classes.Wishlist_icon_bag_selected} 
                                                                                icon="shopping-bag" size="2x"
                                                                            />
                                                                        :
                                                                            <FontAwesomeIcon 
                                                                                // onClick={() => cartHandler(product)}
                                                                                className={classes.Wishlist_icon_bag} 
                                                                                icon="shopping-bag" size="2x" 
                                                                            />
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    { productIndex === i ? 
                                                        <ProductCardModal 
                                                            showProduct={showProduct}
                                                            setShowProduct={setShowProduct}
                                                            product={product} 
                                                            imgs={product.imgsDemo} 
                                                            name={product.name}
                                                        /> 
                                                    : null }
                                                </Fragment>
                            }
                            return productsList
                        })
                    : <h1 className="text-center" style={{width: '100%'}}>NENHUM ITEM NA WISHLIST</h1>}

                </div>
                {/* {
                    products.length >= count ?
                        <div className="d-flex justify-content-between products-show-container">
                            <div className="products-show">
                                <div className="products-show-text">
                                    <button 
                                        disabled={count >= products.length} 
                                        type="button" 
                                        className="btn border-success" 
                                        onClick={() => setCount(count + 4)}
                                        > SHOW MORE
                                    </button>
                                </div>
                            </div>
                            <div className="products-show">
                                <div className="products-show-text">
                                    <button 
                                        disabled={count <= pageLimit || products.length <= pageLimit} 
                                        type="button" 
                                        className="btn border-danger" 
                                        onClick={() => setCount(count - 4)}
                                        > SHOW MENOS
                                    </button>
                                </div>
                            </div>
                        </div>
                    : null
                } */}
                <div className={classes.Products_show_container}>
                    <div className={classes.Products_show}>
                        <div className={classes.Products_show_text}>
                            <button 
                                disabled={count >= products.length} 
                                type="button" 
                                className="btn border-success" 
                                onClick={() => setCount(count + 4)}
                                > SHOW MORE
                            </button>
                        </div>
                    </div>
                    <div className={classes.Products_show}>
                        <div className={classes.Products_show_text}>
                            <button 
                                disabled={count <= pageLimit || products.length <= pageLimit} 
                                type="button" 
                                className="btn border-danger" 
                                onClick={() => setCount(count - 4)}
                                > SHOW MENOS
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

// export default SearchProduct

const mapStateToProps = state => {
    return {
        wish: state.wishlistState,
        cart: state.cartListState
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onWishlistState: () => dispatch({type: actionTypes.WISHLIST, value: wishlistDataFn()}),
//         onCartListState: () => dispatch({type: actionTypes.CARTLIST, value: cartListDataFn()})
//     }
// }


export default connect(mapStateToProps)(SearchProduct)