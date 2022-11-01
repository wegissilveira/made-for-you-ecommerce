import React, { useState } from "react"
import classes from './MainPageProductsHeaderMobile.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MainPageProductsHeaderMobile = props => {
   const {
      tag,
      setTagCB
   } = props

   const [menuTitleWidth, setMenuTitleWidth] = useState('55')

   const menuTitle = tag !== 'all-products' ? tag : 'all products'

   const toggleMenu = e => {
      const menu = e.currentTarget.parentNode.children[1]

      menu.style.display === 'flex' ?
         menu.style.display = 'none' :
         menu.style.display = 'flex'
   }

   const setActiveTabHandler = (e, tag) => {
      const target = e.target

      const container = target.closest('div[class^=MainPageProductsHeaderMobile_Products_select_container]')
      Array.from(container.children).forEach(child => {
         child.querySelector('div[class^=MainPageProductsHeaderMobile_Products_select]').className = classes.Products_select
      })

      target.className = [classes.Products_select, classes.Products_select_active].join(' ')

      setTagCB(tag)
   }


   return (
      <div className={classes.Products_select_container_mobile}>
         <div
            onClick={e => toggleMenu(e)}
            style={{ paddingLeft: `calc(50% - ${menuTitleWidth}px)` }}
         >
            <p>{menuTitle.toUpperCase()}</p>
            <FontAwesomeIcon icon="chevron-down" />
         </div>
         <div onClick={(e) => setActiveTabHandler(e, 'mobile')} >
            <p
               className={classes.Products_select_mobile_active}
               onClick={() => setTagCB('all-products')}
            > <span>ALL PRODUCTS</span>
            </p>
            <p onClick={() => setTagCB('furniture')}><span>FURNITURE</span></p>
            <p onClick={() => setTagCB('decorations')}><span>DECORATIONS</span></p>
            <p onClick={() => setTagCB('textile')}><span>TEXTILE</span></p>
         </div>
      </div>
   )
}

export default MainPageProductsHeaderMobile