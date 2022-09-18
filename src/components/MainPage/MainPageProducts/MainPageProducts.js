import React from 'react'

import classes from './MainPageProducts.module.css'

import Products from '../../Shared/Products/Products'
import productsData from '../../../Data/productsData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MainPageProducts = props => {
    
    let [tag, setTag] = React.useState('all-products')
    let [menuTitleWidth, setMenuTitleWidth] = React.useState('55')
    let [pageLimit, setPageLimit ] = React.useState(8)
    
    let menuTitle = tag !== 'all-products' ? tag : 'all products'

    const setActiveTabHandler = (e, tag) => {
        const target = e.target

        const container = target.closest('div[class^=MainPageProducts_Products_select_container]')
        Array.from(container.children).forEach(child => {
            child.querySelector('div[class^=MainPageProducts_Products_select]').className = classes.Products_select
        })

        target.className = [classes.Products_select, classes.Products_select_active].join(' ')

        setTag(tag)
    }

    const toggleMenu = e => {
        const menu = e.currentTarget.parentNode.children[1]

        menu.style.display === 'flex' ?
            menu.style.display = 'none' :
            menu.style.display = 'flex'
    }

    React.useEffect(() => {
        if (window.matchMedia('(max-width: 480px)').matches) {
            setPageLimit(4)
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            setPageLimit(6)
        } else if (window.matchMedia('(max-width: 1200px)').matches) {
            setPageLimit(9)
        }
    }, [pageLimit])
    
    
    return (
        <div className={classes.Session_container}>
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a category using special switches or go to the section with a convenient filter by product</p>
            <div className={classes.Products_select_container}>
                <div>
                    <div 
                        onClick={(e) => setActiveTabHandler(e, 'all-products')} 
                        className={[
                            classes.Products_select, 
                            classes.Products_select_active].join(' ')
                        }
                    > ALL PRODUCTS
                    </div>
                </div>
                <div>
                    <div 
                        onClick={(e) => setActiveTabHandler(e, 'furniture')} 
                        className={classes.Products_select}
                    > FURNITURE
                    </div>
                </div>
                <div>
                    <div 
                        onClick={(e) => setActiveTabHandler(e, 'decorations')} 
                        className={classes.Products_select}
                    > DECORATIONS
                    </div>
                </div>
                <div>
                    <div 
                        onClick={(e) => setActiveTabHandler(e, 'textile')} 
                        className={classes.Products_select}
                    > TEXTILE
                    </div>
                </div>
            </div>

            <div className={classes.Products_select_container_mobile}>
                <div 
                    onClick={e => toggleMenu(e)}
                    style={{paddingLeft: `calc(50% - ${menuTitleWidth}px)`}}
                >
                    <p>{menuTitle.toUpperCase()}</p>
                    <FontAwesomeIcon icon="chevron-down" />
                </div>
                <div onClick={(e) => setActiveTabHandler(e, 'mobile')} >
                    <p
                        className={classes.Products_select_mobile_active}
                        onClick={() => setTag('all-products')} 
                    > <span>ALL PRODUCTS</span>
                    </p>
                    <p onClick={() => setTag('furniture')}><span>FURNITURE</span></p>
                    <p onClick={() => setTag('decorations')}><span>DECORATIONS</span></p>
                    <p onClick={() => setTag('textile')}><span>TEXTILE</span></p>
                </div>
            </div>

            <Products 
                products={productsData} 
                pageLimit={pageLimit} 
                tag={tag}
            />
        </div>
    )
}

export default MainPageProducts