import React, { useContext, useEffect, useState } from 'react'
import classes from './ColorSelect.module.css'

import { UpdateProductsListContext } from 'components/Shop/Filter/context/FilterContext'

const _ = undefined

const ColorSelect = props => {
   const {
      // colors,
      product,
      selectedColor,
      selectColorHandlerCallback,
      isFilter,
      title
   } = props

   const [currentColors, setCurrentColors] = useState(['red', 'yellow', 'blue', 'purple', 'green'])
   
   const { updateColor } = useContext(UpdateProductsListContext)

   const updateColorStateHandler = color => {
      const colorInput = document.getElementById('all-colors-input')

      const colorObj = {
         currentColor: color,
         lastSelectedColor: color
      }

      updateColor(colorObj)
      colorInput.checked = false
   }
   
   const selectColorHandler = (e, color, load) => {      
      if (isFilter || !load) {
         const bulletBorder = e.currentTarget      
         const colorsBullets = e.currentTarget.parentElement.childNodes
   
         colorsBullets.forEach((bullet) => {
            bullet.style.border = '1px solid black'
            bullet.children[0].style.opacity = 0.4  
         })     
   
         bulletBorder.style.border = '2px solid black'
         bulletBorder.children[0].style.opacity =  1.0
   
         if (isFilter) updateColorStateHandler(color)
         if (!isFilter) selectColorHandlerCallback(color)
         
      } else {
         const currentPage =  window.location.pathname
         let colorsBullets = Array.from(document.querySelectorAll('#colors-selector-bullets'))
         colorsBullets = currentPage === '/shop/' ? colorsBullets[1].childNodes :  colorsBullets[0].childNodes 

         colorsBullets.forEach((bullet) => {
            if (bullet.children[0].style.backgroundColor === selectedColor) {
               bullet.style.border = '2px solid black'
               bullet.children[0].style.opacity = 1.0  
            } else {
               bullet.style.border = '1px solid black'
               bullet.children[0].style.opacity = 0.4  
            }
         }) 
      }
   }

   useEffect(() => {
      if (selectedColor !== undefined) {
         selectColorHandler(_, _, true)
      }
   }, [selectedColor])

   useEffect(() => {
      if (product && product.colors) setCurrentColors(product.colors)
   }, [product])


   return (
      <div className={classes['Color-SKUSelector--wrapper']}>
         { title ? <p>Color</p> : null }
         <div className={classes['Color-bullets--wrapper']} id="colors-selector-bullets">
            {
               currentColors.map((color, i) => {
                  return <div 
                     key={color+'-'+i}
                     style={{ border: '1px solid black' }}
                     onClick={(e) => selectColorHandler(e, color)}
                  >
                     <span
                        style={{ backgroundColor: color, opacity: 0.4 }}
                     >
                     </span>
                  </div>
               })
            }
         </div>
      </div>
   )
}

export default ColorSelect