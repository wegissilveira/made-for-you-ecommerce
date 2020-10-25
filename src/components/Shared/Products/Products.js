import React, { Fragment } from 'react'

import classes from './Products.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductCardModal from '../../Shop/ProductCardModal/ProductCardModal'

// Onde utilizo tais dados era utilizado o 'props.products'
// Agora que decidi utilizar este componente também no 'Wishlist', talvez o fetch dos produtos não deva ser realizado aqui, já que talvez ficarão salvos em uma tabela distinta e, nesse caso, os dados que 'Products' recebem deve vir de seu parent, já que podem diferir.
// Vou buscar uma maneira de salvar apenas a marcação de 'favorito' na tabela e referenciar o produto aqui. Escolherei a maneira mais econômica.
import productsData from '../../../Data/productsData' 
import wishlistDataFn from '../../../Data/wishlistData';
import cartListDataFn from '../../../Data/cartData';


const Products = props => {

    let [count, setCount] = React.useState(props.pageLimit)
    let [pageLimit, setPageLimit] = React.useState(props.pageLimit)
    let [showProduct, setShowProduct] = React.useState(false)
    let [productIndex, setProductIndex] = React.useState(null)

    // let [wishlistState, setWishlist] = React.useState(props.wish)
    
    // let [cartState, setCart] = React.useState(cartListDataFn)
    let [prodExistsCart, setProdExistsCart] = React.useState([])
    
    React.useEffect(() => {
        // let productCartArr = [...cartState]
        let productCartArr = [...props.cart]

        let productsCartIDs = []
        productCartArr.map(item => {
            productsData.map(product => {
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
    // } else if (props.match.params.cat !== undefined) {
    } else if (props.match) {
        tag = 'all'
        category = props.match.params.cat
    } else if (props.tag) {
        tag = props.tag
        category = 'all'
    } else if (props.category) {
        tag = 'all'
        category = props.category
    } else {
        tag = 'all'
        category = 'all'
    }
    
    // Update da state wishlist quando o botão é clicado pelo usuário
    const wishlistHandler = id => {

        // let list = [...wishlistState]
        let list = [...props.wish]
        if (list.includes(id)) {
            list = list.filter(item => item !== id)
        } else {
            list.push(id)
        }
        
        // setWishlist(list)

        localStorage.setItem('wishlist', JSON.stringify(list))

        props.onWishlistState() // => enviando o dispatch
    }

    // Update da state cart quando o botão é clicado pelo usuário
    const cartHandler = product => {

        // let cartList = [...cartState]
        let cartList = [...props.cart]
        let productsCartIDs = [...prodExistsCart]

        let count = 0
        cartList.map(item => {
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
        
        // setCart(cartList)
        setProdExistsCart(productsCartIDs)

        localStorage.setItem('cartList', JSON.stringify(cartList))

        props.onCartListState()
    }

    // O loop para a exibição dos produtos é realizado sobre o array 'products', que possui todos os itens ou somente os produtos com a tag selecionada. 
    // Caso utilizemos diretamente o array completo quando alguma tag estiver selecionada isso fará com que só sejam mostrados os itens que ocupam indexes inferiores ao valor de 'count', 
    // O que é perfeito em caso de todos os produtos estarem sendo mostrados, mas que criaria fileiras incompletas quando se seleciona alguma tag
    // Além disso, antes de entrar nas verificações de tags e categorias é checado se se trata da página de favoritos (wishlist). Caso esse seja o caso é realizado um filter e retornado somente os produtos cujo o id exista na tabela de wishlist.
    let products 
    if (props.wishlist) {
        // products = productsData.filter(product => wishlistState.includes(product._id))
        products = productsData.filter(product => props.wish.includes(product._id))

    } else {

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
    }

    //Determina o intervalo de preços que os produtos devem aparecer, por exemplo, maior que 50 e menor que 500
    if (props.valueRange) {
        products = products.filter(product => 
            parseFloat(product.price) >= props.valueRange[0] && parseFloat(product.price) <= props.valueRange[1]
        )
    }

    // Determina os produtos que devem ser exibidos baseado na cor selecionada, ou seja, serão mostrados somente os produtos que possuem uma variação da cor desejada
    if (props.productColor && props.productColor !== '') {
        products = products.filter(product => 
            product.colors.includes(props.productColor)
        )
    }

    // Seleciona os produtos pelo tipo de oferta
    if (props.offer && props.offer.length > 0) {
        products = products.filter(product => 
            props.offer.includes(product.offer))
    }
 
    // Ordena produtos
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
    
    // Abre e fecha o filtro
    const openModalHandler = i => {
        setShowProduct(!showProduct)
        setProductIndex(i)
    }

    // Fecha o modal e seta a nova lista de favoritos a partir do modal
    // const closeModalCallback = (arg) => {
    const closeModalCallback = () => {
        setShowProduct(!showProduct)
        // setWishlist(arg[0])
        // setCart(arg)
        console.log('teste')

    }

    if (showProduct === true) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "visible"
    }
    
    console.log(props.cart)
    // console.log(props.wish)

    
    return (
        <Fragment>
            <div className="container">
                {props.match ? <h1 className="text-center">{category.toUpperCase()}</h1> : null}
                <div className="row">
                    {/* Corrigir key */}
                    {/* Funcionando perfeitamente, mas ainda falta melhorar a transição quando clicamos em 'SHOW MORE' */}
                    {products.length > 0 ?
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
                                                                    {/* {   wishlistState.includes(product._id) ? */}
                                                                    {   props.wish.includes(product._id) ?
                                                                            <FontAwesomeIcon 
                                                                                onClick={() => wishlistHandler(product._id)} 
                                                                                className={classes.Wishlist_icon_heart} 
                                                                                icon={['fas', 'heart']} size="2x" 
                                                                            />
                                                                        :
                                                                            <FontAwesomeIcon 
                                                                                onClick={() => wishlistHandler(product._id)} 
                                                                                className={classes.Wishlist_icon_heart} 
                                                                                icon={['far', 'heart']} size="2x" 
                                                                            />
                                                                    }
                                                                    <Link to={"/shop/product/" + product._id} >
                                                                        <div style={{height: '359px'}} className="d-flex align-items-center">
                                                                            <img 
                                                                                // onClick={() => setCard(i)} 
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
                                                                                onClick={() => openModalHandler(i)} 
                                                                                icon="eye" 
                                                                                className={classes.Products_description_eye} 
                                                                            />
                                                                            
                                                                            {
                                                                                prodExistsCart.includes(product._id) ?
                                                                                    <FontAwesomeIcon 
                                                                                        onClick={() => cartHandler(product)}
                                                                                        className={classes.Wishlist_icon_bag_selected} 
                                                                                        icon="shopping-bag" size="2x"
                                                                                    />
                                                                                :
                                                                                    <FontAwesomeIcon 
                                                                                        onClick={() => cartHandler(product)}
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
                                                                    // setShowProduct={setShowProduct}
                                                                    setShowProduct={closeModalCallback}
                                                                    product={product} 
                                                                    // wishlist={wishlistState}
                                                                    wishlist={props.wish}
                                                                    // cartList={cartState}
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


const mapStateToProps = state => {
    return {
        wish: state.wishlistState,
        cart: state.cartListState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWishlistState: () => dispatch({type: 'WISHLIST', value: wishlistDataFn()}),
        onCartListState: () => dispatch({type: 'CARTLIST', value: cartListDataFn()})
    }
}


// export default Products
export default connect(mapStateToProps, mapDispatchToProps)(Products)