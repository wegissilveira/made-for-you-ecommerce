import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import './Cart.css'

// import Products from '../../Shared/Products/Products'
import ProductQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'

import cartData from '../../../Data/cartData'


const Cart = props => {

    

    const pricesArr = cartData.map(item => parseFloat(item.price))

    // Preencho um array com um índice para cada produto no carrinho utilizando o length do array 'cartData'
    let [qtde, setQtde] = React.useState(Array(cartData.length).fill(1))
    const [pricesArrState, setPricesArrState] = React.useState(pricesArr)
    // let [finalPrice, setFinalPrice] = React.useState(0)
    // console.log(pricesArrState)

    let finalPrice = 0
    pricesArrState.map(item => {
        
        // setFinalPrice(finalPrice + parseFloat(item))
        finalPrice = finalPrice + parseFloat(item)
        return finalPrice
    })


    // Aqui eu atualizo a quantidade de produtos do item que ocupa a posição no array que está sofrendo a alteração.
    // Ou seja, se eu altero a quantidade do produto de índice 2, somente o índice 2 receberá a alteração e somente o preço total deste será alterado, já que o índice é utilizado para realizar o cálculo => qtde[i] * parseInt(product.price)
    // Caso eu não tivesse um array com uma posição para cada produto, eu teria somente uma state para todos, sendo assim, quando a quantidade de um alterasse, os preços de todos acompanhariam, já que se baseariam na mesma variável.
    // Poderia ter sido criada uma state para cada produto, mas isso, além de muito mais verboso que desta forma, só seria possível em caso do número de produtos ser fixo.
    const setQtdeHandler = (value, index) => {
        let arrQtde = [...qtde]
        let arrPrices = [...pricesArrState]

        let newPrice = (arrPrices[index] / arrQtde[index]) * value
        arrPrices[index] = newPrice
        arrQtde[index] = value
        
        setPricesArrState(arrPrices)
        setQtde(arrQtde)
    }
    


    return (
        <div className="products-container session-container">
            <h1 className="text-center mb-5 mt-5">CART</h1>
            <div className="cart-details-container">
                <div className="d-flex justify-content-between row border-bottom text-secondary font-weight-bold">
                    <p className="col-4">PRODUCT</p>
                    <p className="col-2">DISCOUNT</p>
                    <p className="col-2">PRICE</p>
                    <p className="col-2">QUANTITY</p>
                    <p>TOTAL</p>
                </div>
                {cartData.map((product, i) => {
                    return  <div key={i} className="cart-details d-flex justify-content-between align-items-center row mt-3">
                                <div className="col-4 d-flex align-items-center" style={{height: '80px'}}>
                                    
                                    <div style={{width: '80px', height: '80px', marginRight: '30px'}}>
                                        <img style={{maxWidth: '100%', maxHeight: '100%'}} src={product.imgsDemo[0]} alt='img' />
                                    </div>

                                    <div className="d-flex flex-column justify-content-between mb-1" style={{height: '100%'}}>
                                        <p className="font-weight-bold">{product.name}</p>
                                        <div className="d-flex" style={{fontSize: '12px'}}>
                                            <div className="text-secondary">
                                                <p className="mb-2">Size</p>
                                                <p>Color</p>
                                            </div>
                                            <div className="ml-3">
                                                <p className="mb-2">100 x 100</p>
                                                <p>Pink</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-weight-bold col-2">0%</p>
                                <p className="font-weight-bold col-2">$ {product.price}</p>
                                <div className="col-2">
                                    <ProductQtde changeQtdeCallBack={qtde => setQtdeHandler(qtde, i)} />
                                </div>
                                
                                <p className="font-weight-bold">$ {(qtde[i] * parseFloat(product.price)).toFixed(2)}</p>
                            </div>
                })
                  
                }
                <div className="d-flex justify-content-between mt-5 border-bottom">
                    <Link to="/shop/">
                        <p className="cart-dark-button">
                            <FontAwesomeIcon icon="long-arrow-alt-left" />
                            <span>CONTINUE COMPRANDO</span>
                        </p>
                    </Link>
                    <p className="cart-light-button">
                        <FontAwesomeIcon icon="sync-alt" />
                        <span>UPDATE CART</span>
                    </p>
                </div>
                <div className="form-cart-container row mt-4 mr-0 ml-0">
                    <div className="col-4 pl-0 form-cart-first-column">
                        <p>COUPON DISCOUNT</p>
                        <p>Enter your coupon code if you have one</p>
                        <input placeholder="Enter your code"/>
                        <p className="cart-light-button">APPLY COUPON</p>
                    </div>
                    <div className="col-4 form-cart-second-column">
                        <p>CALCULATE SHIPPING</p>
                        <select
                            className="
                                select-cart
                                border-left-0 
                                border-right-0
                                border-top-0
                                border-bottom"
                        >
                            <option>Argentina</option>
                            <option>Brazil</option>
                            <option>Germany</option>
                            <option>United States</option>
                        </select>
                        <input placeholder="State/Country" />
                        <input placeholder="Town/City" />
                        <input placeholder="Postcode/ZIP" />
                        <p className="cart-light-button">UPDATE</p>
                    </div>
                    <div className="col-4 pr-0 form-cart-third-column">
                        <div className="border">
                            <div className="form-cart-total-container">
                                <div className="border-bottom">
                                    <p>SUBTOTAL</p>
                                    <p>$ {finalPrice.toFixed(2)}</p>
                                </div>
                                <div className="border-bottom">
                                    <p>SHIPPING</p>
                                    <p>$ 20.00</p>
                                </div>
                                <div>
                                    <p>TOTAL</p>
                                    <p>$ 40.00</p>
                                </div>
                            </div>
                        </div>
                        <p className="cart-dark-button" style={{width: '100%'}}>PROCEED TO CHECKOUT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart