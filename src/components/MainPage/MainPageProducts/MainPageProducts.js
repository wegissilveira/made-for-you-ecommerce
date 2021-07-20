import React from 'react'

import classes from './MainPageProducts.module.css'

import Products from '../../Shared/Products/Products'
import productsData from '../../../Data/productsData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MainPageProducts = props => {
    
    let [tag, setTag] = React.useState('all-products')
    let [menuTitleWidth, setMenuTitleWidth] = React.useState('55')

    let menuTitle = tag !== 'all-products' ? tag : 'all products'

    const setActiveTabHandler = (e, screen) => {

        let target = e.target
        let children = e.currentTarget.children
        let childrenArray = Array.from(children)

        if (!target.className.match('Products_select_container') && screen !== 'mobile') { 
            childrenArray.forEach(child => {
                child.children[0].className = classes.Products_select
                child.children[1].className = ''
            })
            
            target.className = [classes.Products_select, classes.Products_select_active].join(' ')
            target.parentNode.children[1].className = classes.Products_selectHeader_arrow
        }

        if (screen === 'mobile' && target.tagName === 'P') {
            childrenArray.forEach(child => {
                child.className = ''    
            })
            
            target.className = classes.Products_select_mobile_active
            
            setMenuTitleWidth(target.children[0].offsetWidth / 2)
        }        
    }

    const toggleMenu = e => {
        const menu = e.currentTarget.parentNode.children[1]

        menu.style.display === 'flex' ?
            menu.style.display = 'none' :
            menu.style.display = 'flex'
    }
    
    return (
        <div className={classes.Session_container}>
            <h1>FEATURED PRODUCTS</h1>
            <p>Select a category using special switches or go to the section with a convenient filter by product</p>
            <div 
                onClick={(e) => setActiveTabHandler(e)} 
                className={classes.Products_select_container}
            >
                <div>
                    <div 
                        onClick={() => setTag('all-products')} 
                        className={[
                            classes.Products_select, 
                            classes.Products_select_active].join(' ')
                        }
                    > ALL PRODUCTS
                        
                    </div>
                    <p className={classes.Products_selectHeader_arrow}> <span></span> </p>
                </div>
                <div>
                    <div 
                        onClick={() => setTag('furniture')} 
                        className={classes.Products_select}
                    > FURNITURE
                        
                    </div>
                    <p> <span></span> </p>
                </div>
                <div>
                    <div 
                        onClick={() => setTag('decorations')} 
                        className={classes.Products_select}
                    > DECORATIONS
                        
                    </div>
                    <p> <span></span> </p>
                </div>
                <div>
                    <div 
                        onClick={() => setTag('textile')} 
                        className={classes.Products_select}
                    > TEXTILE
                        
                    </div>
                    <p> <span></span> </p>
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
                pageLimit={8} 
                tag={tag}
            />
        </div>
    )
}

export default MainPageProducts