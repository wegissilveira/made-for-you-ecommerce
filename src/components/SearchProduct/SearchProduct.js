import React, {Fragment} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProductCardModal from '../Shop/ProductCardModal/ProductCardModal'

import productsData from '../../Data/productsData' 


const SearchProduct = props => {
    
    const pageLimit = 12
    let [count, setCount] = React.useState(pageLimit)
    let [showProduct, setShowProduct] = React.useState(false)
    let [productIndex, setProductIndex] = React.useState(null)


    let products = []
    let searchKey = new RegExp(props.match.params.searchKey, 'gi') 

    productsData.map(product => {
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
                                                                    <FontAwesomeIcon className="wishlist-icon" icon={['fas', 'heart']} size="2x" />
                                                            <Link to={"/shop/product/" + product._id} >
                                                                <img 
                                                                    // onClick={() => setCard(i)} 
                                                                    src={product.img} alt="Produto" 
                                                                    style={{maxWidth: '100%'}} 
                                                                />
                                                            </Link>
                                                            <div className="products-description d-flex justify-content-between align-items-center">
                                                                <div className="d-flex flex-column align-items-start products-description-icons">
                                                                    <p>{product.name}</p>
                                                                    <p>$ {product.price}</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-center products-description-icons">
                                                                    <FontAwesomeIcon onClick={() => setCard(i)} icon="eye" />
                                                                    <FontAwesomeIcon icon="suitcase" size="2x" />
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
                {
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
                }

            </div>
        </Fragment>
    )
}

export default SearchProduct