import React from 'react'

import './Products.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products = props => {

    let [count, setCount] = React.useState(props.pageLimit)
    
    let products 
    if (props.tag === 'all') {
        products = props.products
    } else {
        products = props.products.filter(item => item.tag === props.tag)
    }  


    return (
        <div className="session-container container">
            <div className="row">
                {/* Corrigir key */}
                {/* Funcionando perfeitamente, mas ainda falta melhorar a transição quando clicamos em 'SHOW MORE' */}
                {
                    products.map((product, i) => {
                        let productsList
                        // O loop é executado somente se os itens forem menores que 'count', variável que determina quantos itens serão mostrados na tela, isso garante que não sejam exibidos todos os itens de uma vez e que o usuário tenha o controle de incrementar ou diminuir 'count'
                        if (i + 1 <= count) {
                            // Mostra o item relacionado à aba clicada, furniture, textile ou decorations
                            if (props.tag === 'all' || product.tag === props.tag) {
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
                        }
                        return productsList
                    })
                }

            </div>
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
                            disabled={count <= props.pageLimit || products.length <= props.pageLimit} 
                            type="button" 
                            className="btn border-danger" 
                            onClick={() => setCount(count - 4)}
                            > SHOW MENOS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products