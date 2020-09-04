import React, { Fragment } from 'react'

import './Products.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProductCardModal from '../../Shop/ProductCardModal/ProductCardModal'

// Onde utilizo tais dados era utilizado o 'props.products'
// Agora que decidi utilizar este componente também no 'Wishlist', talvez o fetch dos produtos não deva ser realizado aqui, já que talvez ficarão salvos em uma tabela distinta e, nesse caso, os dados que 'Products' recebem deve vir de seu parent, já que podem diferir.
// Vou buscar uma maneira de salvar apenas a marcação de 'favorito' na tabela e referenciar o produto aqui. Escolherei a maneira mais econômica.
import productsData from '../../../productsData' 

const Products = props => {

    let [count, setCount] = React.useState(props.pageLimit)
    let [showProduct, setShowProduct] = React.useState(false)
    let [productIndex, setProductIndex] = React.useState(null)


    if (count === undefined) {
        setCount(8)
    }

    let tag
    let category
    if (props.tag) {
        tag = props.tag
        category = 'all'
    // } else if (props.match.params.cat !== undefined) {
    } else if (props.match) {
        tag = 'all'
        category = props.match.params.cat
    } else {
        tag = 'all'
        category = 'all'
    }

    
    // O loop para a exibição dos produtos é realizado sobre o array 'products', que possui todos os itens ou somente os produtos com a tag selecionada. 
    // Caso utilizemos diretamente o array completo quando alguma tag estiver selecionada isso fará com que só sejam mostrados os itens que ocupam indexes inferiores ao valor de 'count', 
    // O que é perfeito em caso de todos os produtos estarem sendo mostrados, mas que criaria fileiras incompletas quando se seleciona alguma tag
    let products 
    if (tag === 'all' && category === 'all') {
        products = productsData
    } else if (tag === 'all' && category !== 'all') {
        products = productsData.filter(item => item.category === category)
    } else if (tag !== 'all' && category === 'all') {
        products = productsData.filter(item => item.tag === tag)
    } else if (tag !== 'all' && category !== 'all') {
        products = productsData.filter(item => item.tag === tag)
        products = products.filter(item => item.category === category)
    }

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
                <div className="row">
                    {/* Corrigir key */}
                    {/* Funcionando perfeitamente, mas ainda falta melhorar a transição quando clicamos em 'SHOW MORE' */}
                    {
                        products.map((product, i) => {

                            let productsList
                            // O loop é executado somente se os itens forem menores que 'count', variável que determina quantos itens serão mostrados na tela, isso garante que não sejam exibidos todos os itens de uma vez e que o usuário tenha o controle de incrementar ou diminuir 'count'
                            if (i + 1 <= count) {
                                // Mostra o item relacionado à aba clicada, furniture, textile ou decorations
                                if (tag === 'all' || product.tag === tag) {
                                    if (category === 'all' || product.category === category) {
                                        productsList = <Fragment key={product+i}>
                                                            <div className=" col-3 mt-4 pl-0">
                                                                <div className="border p-0">
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
        </Fragment>
    )
}

export default Products