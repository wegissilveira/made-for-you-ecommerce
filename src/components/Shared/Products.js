import React from 'react'

import './Products.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products = props => {

    let [count, setCount] = React.useState(props.pageLimit)
    let [disable, setDisable] = React.useState(false)
    
    const setList = () => {
        setCount(count + 4)

        if (count + 4 >= props.products.length) {
            setDisable(true)
        }
    }
    

    return (
        <div className="session-container container">
            <div className="row">
                {/* Corrigir key */}
                {/* Funcionando perfeitamente, mas ainda falta melhorar a transição quando clicamos em 'SHOW MORE' */}
                {
                    props.products.map((product, i) => {
                        let productsList
                        if(i + 1 <= count) {
                            productsList = <div className=" col-3 mt-4 pl-0" key={product+i}>
                                                <div className="border p-0">
                                                    <img src={product.img} alt="Produto" style={{maxWidth: '100%'}} />
                                                    <div className="products-description d-flex justify-content-between align-items-center">
                                                        <div className="d-flex flex-column align-items-start products-description-icons">
                                                            <p>{product.name}</p>
                                                            <p>$ {product.price}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center products-description-icons">
                                                            <FontAwesomeIcon icon="eye" />
                                                            <FontAwesomeIcon icon="suitcase" size="2x" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                        }
                        return productsList
                    })
                }

            </div>
            <div className="products-showmore">
                <div className="products-showmore-text">
                    <button 
                        disabled={disable} 
                        type="button" 
                        className="btn" 
                        onClick={() => setList()}
                        > SHOW MORE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Products