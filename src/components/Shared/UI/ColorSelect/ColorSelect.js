import React, { useContext, useState, useEffect } from 'react'
import classes from './ColorSelect.module.css'

import { UpdateProductsListContext } from 'components/Shop/Filter/context/FilterContext'

const ColorSelect = props => {
   const {
      colors,
      selectedColor
   } = props

   let opacityArr = Array(colors.length).fill('0.4')

   let borderArr = Array(colors.length).fill('1px solid black')

   let [opacity, setOpacity] = useState(opacityArr)
   let [border, setBorder] = useState(borderArr)

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

   // Quando o modal do produto na prateleira abre ele está atualizando o contexto com o código novo
   // Isso não pode ocorrer. As cores no modal, assim como em qualquer lugar fora do filtro não deve atualizar o contexto
   // Isso está acontecendo através da chamada de 'updateColorStateHandler', que aciona o contexto com 'updateColor'
   // Corrigir isso juntamente com o destaque da cor selecionada feita de nova maneira através do script comentado
   const selectColorHandler = (e, color, load) => {
      let newBorder = [...border]
      let newOpacity = [...opacity]

      colors.forEach((bColor, k) => {
         if (color === bColor) {
            // console.log('color loop: ', color);
            newBorder[k] = '2px solid black'
            newOpacity[k] = '1.0'
         } else {
            // console.log('color loop ELSE: ', color);
            newBorder[k] = '1px solid black'
            newOpacity[k] = '0.4'
         }
      })

      setBorder(newBorder)
      setOpacity(newOpacity)

      if (load !== true) updateColorStateHandler(color)

      // const colorsBullets = Array.from(document.getElementById('colors-selector-bullets').childNodes)
      // const bulletBorder = e.currentTarget
      // const currentPage = window.location.pathname

      // colorsBullets.forEach((bullet) => {
      //    bullet.style.border = '1px solid black'
      //    bullet.children[0].style.opacity = 0.4  
      // })     

      // bulletBorder.style.border = '2px solid black'
      // bulletBorder.children[0].style.opacity =  '1.0'

      // if (load !== true && currentPage === '/shop/') updateColorStateHandler(color)
   }

   useEffect(() => {
      if (selectedColor !== undefined) {
         selectColorHandler(selectedColor, true)
      }
   }, [])

   // console.log('border: ', border);
   // console.log('opacity: ', opacity);


   return (
      <div className={classes.Color_select_container} id="colors-selector-bullets">
         {
            colors.map((color, i) => {
               return <div 
                  key={color+'-'+i}
                  style={{ border: border[i] }}
                  onClick={(e) => selectColorHandler(e, color)}
               >
                  <span
                     style={{ backgroundColor: color, opacity: opacity[i] }}
                  >
                  </span>
               </div>
            })
         }
      </div>
   )
}

export default ColorSelect