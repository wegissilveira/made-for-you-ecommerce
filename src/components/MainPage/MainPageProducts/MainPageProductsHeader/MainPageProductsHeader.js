import React from "react"
import classes from './MainPageProductsHeader.module.css'

const MainPageProductsHeader = (props) => {
   const { 
      setTagCB
   } = props
   
   const setActiveTabHandler = (e, tag) => {
      const target = e.target

      const container = target.closest('div[class^=MainPageProductsHeader_Products_select_container]')
      Array.from(container.children).forEach(child => {
         child.querySelector('div[class^=MainPageProductsHeader_Products_select]').className = classes.Products_select
      })

      target.className = [classes.Products_select, classes.Products_select_active].join(' ')

      setTagCB(tag)
   }


   return (
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
   )
}

export default MainPageProductsHeader