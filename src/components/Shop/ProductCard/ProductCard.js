import React, { Fragment } from 'react'

import classes from './ProductCard.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import productsData from '../../../Data/productsData'
import cartDataFn from '../../../Data/cartData.js'
import wishlistFn from '../../../Data/wishlistData'

import ProductsQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect'

  

const ProductCard = props => {

    const product = productsData.find(product => product._id === props.match.params.id)

    let [cartState, setCart] = React.useState(cartDataFn)

    let [prodExists, setProdExists] = React.useState(0)

    // Controla a state 'prodExists' para definir qual botão será mostrado, o de adicionar item ou o de remover. 
    // Caso 'prodExists' sejam mantido 0 significa que o item não existe na sacola, então será mostrado o botão de adicionar.
    React.useEffect(() => {
        let productCartArr = [...cartState]

        productCartArr.map(item => {
            if (item._id === product._id) setProdExists(++prodExists)
        })

    }, [])
    
    let [imgSlide, setImgSlide] = React.useState(0)
    let [productColor, setProductColor] = React.useState('') // => Armazena cor selecionada do produto
    let [wishlistState, setWishlist] = React.useState(wishlistFn)

    let [qtde, setQtde] = React.useState(1)
    let [size, setSize] = React.useState('100x100')

    let [translateValue, setTranslateValue] = React.useState(0)

    const translateSlider = {
        transform: `translateX(${translateValue}%)`,
        transition: '.8s ease-in-out'
    }

    const changeSlide = arg => {
        if (arg === 'previous') {
             
            if (imgSlide > 0) {
                setImgSlide(imgSlide - 1)
                setTranslateValue(translateValue + 100)
            } else {
                setImgSlide(product.imgsDemo.length - 1)
                setTranslateValue((product.imgsDemo.length - 1) * -100)
            }
            
        } else if (arg === 'next') {

            if (imgSlide < product.imgsDemo.length - 1) {
                setImgSlide(imgSlide + 1)
                setTranslateValue(translateValue -100)
            } else {
                setImgSlide(0)
                setTranslateValue(0)
            }
            
        }else if (typeof arg === 'number') {
            setImgSlide(arg / (-100))
            setTranslateValue(arg)
        }
    }

    // Selecionar cor do produto ao clicar nos círculos.
    // Tal método muda a UI apresentando o slide que se refere a cor selecionada, mas também armazena os valores no objeto com todas as informações do produto enviado para o DB (ainda será criado).
    const selectColorHandler = (color, i) => {
        setProductColor(color)
        setImgSlide(i)
    }

    const setQtdeHandler = value => {
        setQtde(value)
    }

    const wishlistHandler = id => {

        let list = [...wishlistState]
        if (list.includes(id)) {
            list = wishlistState.filter(item => item !== id)
        } else {
            list.push(id)
        }
        
        setWishlist(list)

        localStorage.setItem('wishlist', JSON.stringify(list))
    }
    
   
    const productCartHandler = () => {
        
        let productCartArr = [...cartState]
        // let productCartArr = []

        let count = 0
        productCartArr.map(item => {
            if (item._id === product._id) count++
        })

        if (count === 0) {
            let productCart = {}

            productCart._id = product._id
            productCart.qtde = qtde
            productCart.color = productColor
            productCart.size = size
    
            productCartArr.push(productCart)
            setProdExists(1)

        } else {
            productCartArr = productCartArr.filter(item => item._id !== product._id)
            setProdExists(0)
        }

        setCart(productCartArr)

        localStorage.setItem('cartList', JSON.stringify(productCartArr))
    }

   
    



    return (
        
        <Fragment>
            <div className={`mt-5 ${classes.Session_container}`}>
                <div className={`container-fluid ${classes.Product_card_container}`}>
                    <div className="pl-0 pr-5">
                        <div className={classes.Main_img_slider}>
                            {/* <img src={product.imgsDemo[imgSlide]} alt="img-1" /> */}
                            <div className="d-flex" style={translateSlider}>
                                {product.imgsDemo.map((img, i) => 
                                    <img key={i} src={img} alt="img-1"/>
                                )}
                            </div>
                            <div className={classes.Change_slide_arrows_container}>
                                <FontAwesomeIcon onClick={() => changeSlide('previous')} icon="arrow-left" />
                                <FontAwesomeIcon onClick={() => changeSlide('next')} icon="arrow-right" />
                            </div>
                        </div>
                        <div className={classes.Product_card_sub_images}>
                            <img 
                                onClick={() => changeSlide(0)} 
                                src={product.imgsDemo[0]} alt="img-1" 
                                style={{maxWidth: '30%', maxHeight: '30%', cursor: 'pointer'}} 
                            />
                            <img 
                                onClick={() => changeSlide(-100)} 
                                src={product.imgsDemo[1]} alt="img-2" 
                                style={{maxWidth: '30%', maxHeight: '30%', cursor: 'pointer'}} 
                            />
                            <img 
                                onClick={() => changeSlide(-200)} 
                                src={product.imgsDemo[2]} alt="img-3" 
                                style={{maxWidth: '30%', maxHeight: '30%', cursor: 'pointer'}} 
                            />
                        </div>
                    </div>
                    <div className="col-6 ml-5">
                        <div className="d-flex justify-content-between">
                            <p>123456</p>
                            <p>exemplo</p>
                        </div>
                        <h1 className="mt-5">{product.name}</h1>
                        <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                        <div className={`mt-4 ${classes.Product_price_container}`}>
                            <h3 className="mb-0">$ {product.price}</h3>
                            <div className={`text-success ${classes.Product_price_availability}`}>
                                <FontAwesomeIcon icon="check" />
                                <p>Available</p>
                            </div>
                        </div>
                        <div className={`mt-4 ${classes.Product_details_container}`}>
                            <div>
                                <p>Size</p>
                                <select 
                                    onChange={e => setSize(e.target.value)}
                                    className={`mt-2 border-bottom ${classes.Product_details_select}`}
                                >
                                    <option value="100x100">100x100 cm</option>
                                    <option value="200x200">200x200 cm</option>
                                    <option value="300x300">300x300 cm</option>
                                </select>
                            </div>
                            <div>
                                <p>Color</p>
                                <ColorSelect 
                                    colors={product.colors}
                                    selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                                />
                            </div>
                        </div>
                        <div className={`mt-4 ${classes.Product_wishlist_container}`}>
                            <ProductsQtde 
                                changeQtdeCallBack={qtde => setQtdeHandler(qtde)}  
                                max={8}
                            />
                            { prodExists === 0 ?
                                    <button 
                                        onClick={() => productCartHandler()}
                                        type="button"  
                                        className="btn btn-success"
                                    > ADD TO BAG
                                    </button>  
                                : 
                                    <button 
                                        onClick={() => productCartHandler()}
                                        type="button"  
                                        className="btn btn-danger"
                                        > REMOVE FROM BAG
                                    </button>   
                            }
                            {   wishlistState.includes(product._id) ?
                                    <FontAwesomeIcon 
                                        onClick={() => wishlistHandler(product._id)} 
                                        className={classes.Wishlist_icon_alt} 
                                        icon={['fas', 'heart']} size="2x" 
                                    />
                                :
                                    <FontAwesomeIcon 
                                        onClick={() => wishlistHandler(product._id)} 
                                        className={classes.Wishlist_icon_alt} 
                                        icon={['far', 'heart']} size="2x" 
                                    />
                            }
                        </div>
                        <div className={`mt-3 ${classes.Product_category_container}`}>
                            <p>Category: <span className="font-weight-bold">{product.category}</span></p>
                            <p>Tags: <span className="font-weight-bold">{product.tag}</span></p>
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-5">
                            <div className={`mt-3 ${classes.Product_specifications_container}`}>
                                <div className="d-flex justify-content-between">
                                    <h6>DETAILS</h6>
                                    <h6>SPECIFICATIONS</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p>Material:</p>
                                        <p>Care:</p>
                                        <p>Size:</p>
                                    </div>
                                    <div>
                                        <p className="font-weight-bold"> Polyester</p>
                                        <p className="font-weight-bold"> 30 degree wash</p>
                                        <p className="font-weight-bold"> 100x100 cm</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                <FontAwesomeIcon icon="share-alt" className="mr-4" />
                                <p>Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </Fragment>
    )
}

export default ProductCard