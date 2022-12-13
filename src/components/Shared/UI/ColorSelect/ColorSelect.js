import React, { useContext, useEffect, useState } from 'react'
import classes from './ColorSelect.module.scss'

import { UpdateProductsListContext } from 'components/Shop/Filter/context/FilterContext'
import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

const _ = undefined

const ColorSelect = props => {
   const {
      product,
      isFilter,
      title
   } = props

   const [currentColors, setCurrentColors] = useState(['red', 'yellow', 'blue', 'purple', 'green'])
   
   const { updateFilterColor } = useContext(UpdateProductsListContext)
   const { updateColor } = useContext(UpdateProductValuesContext)
   const { productColor } = useContext(ProductDataContext)

   const updateColorStateHandler = color => {
      const colorInput = document.getElementById('all-colors-input')

      const colorObj = {
         currentColor: color,
         lastSelectedColor: color
      }

      updateFilterColor(colorObj)
      colorInput.checked = false
   }
   
   const selectColorHandler = (e, color, load) => {      
      if (isFilter || !load) {
         const bulletBorder = e.currentTarget      
         const colorsBullets = e.currentTarget.parentElement.childNodes
   
         colorsBullets.forEach((bullet) => {
            bullet.className = classes['Color-bullet']
         })     
   
         bulletBorder.className = [classes['Color-bullet'], classes['Active-bullet']].join(' ')
   
         if (isFilter) updateColorStateHandler(color)
         if (!isFilter) updateColor(color, true)
         
      } else {
         const currentPage =  window.location.pathname
         let colorsBullets = Array.from(document.querySelectorAll('#colors-selector-bullets'))
         colorsBullets = currentPage === '/shop/' ? colorsBullets[1].childNodes :  colorsBullets[0].childNodes 

         colorsBullets.forEach((bullet) => {
            if (bullet.children[0].style.backgroundColor === productColor) {
               bullet.className = [classes['Color-bullet'], classes['Active-bullet']].join(' ')
            } else {
               bullet.className = classes['Color-bullet']
            }
         }) 
      }
   }

   useEffect(() => {
      if (productColor !== undefined) {
         selectColorHandler(_, _, true)
      }
   }, [productColor])

   useEffect(() => {
      if (product && product.colors) setCurrentColors(product.colors)
   }, [product])


   return (
      <div className={classes['Color-SKUSelector--wrapper']}>
         { title ? <p>Color</p> : null }
         <div 
            className={classes['Color-bullets--wrapper']} 
            id="colors-selector-bullets"
         >
            {
               currentColors.map((color, i) => {
                  return <div 
                     className={classes['Color-bullet']}
                     key={color+'-'+i}
                     onClick={(e) => selectColorHandler(e, color)}
                  >
                     <span style={{ backgroundColor: color }}></span>
                  </div>
               })
            }
         </div>
      </div>
   )
}

export default React.memo(ColorSelect)