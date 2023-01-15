import React, { useContext, useEffect, useState, useRef } from 'react'
import classes from './ColorSelect.module.scss'

import { ProductType, Color, HEX } from 'common/types'

import { UpdateFilterListContext } from 'components/Shop/Filter/context/FilterContext'
import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"


type ColorEl = {
   action: 'click'
   ev: React.MouseEvent<HTMLDivElement>
   color: Color
}

type ColorLoad = {
   action: 'load'
}

type ColorAction = ColorEl | ColorLoad

type Props = {
   product?: ProductType
   title?: string
   isFilter: boolean 
}

const ColorSelect = (props: Props) => {
   const {
      product,
      isFilter,
      title
   } = props

   const [currentColors, setCurrentColors] = useState<Color[]>(['#FF0000', '#FFFF00', '#0000FF', '#800080', '#008000'])
   
   const { updateFilterColor } = useContext(UpdateFilterListContext)
   const { updateColor } = useContext(UpdateProductValuesContext)
   const { productColor } = useContext(ProductDataContext)  

   const didMountRef = useRef(false)

   const updateColorStateHandler = (color: Color) => {
      const colorInput = document.getElementById('all-colors-input') as HTMLInputElement

      const colorObj = {
         currentColor: color,
         lastSelectedColor: color
      } as const

      updateFilterColor(colorObj)
      colorInput.checked = false
   }

   const hexToRGB = (hex: HEX) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
  
      return `rgb(${r}, ${g}, ${b})`
   }
      
   const selectColorHandler = (colors: ColorAction) => {  
      if (colors.action === 'load') {         
         const currentPage =  window.location.pathname
         const colorsBulletsArr = Array.from(document.querySelectorAll('#colors-selector-bullets'))
         const colorsBulletsEl = currentPage === '/shop/' ? colorsBulletsArr[1].children : colorsBulletsArr[0].children         

         Array.from(colorsBulletsEl).forEach((bullet) => {
            if ((bullet.children[0] as HTMLSpanElement).style.backgroundColor === hexToRGB(productColor)) {
               bullet.className = [classes['Color-bullet'], classes['Active-bullet']].join(' ')
            } else {
               bullet.className = classes['Color-bullet']
            }
         }) 
      }

      if (colors.action === 'click') {
         const bulletBorder = colors.ev.currentTarget      
         const colorsBullets = colors.ev.currentTarget.parentElement!.children
   
         Array.from(colorsBullets).forEach((bullet) => {
            bullet.className = classes['Color-bullet']
         })     
   
         bulletBorder.className = [classes['Color-bullet'], classes['Active-bullet']].join(' ')
   
         if (isFilter) {
            updateColorStateHandler(colors.color)
         } 
         if (!isFilter) updateColor(colors.color, true)
      }
   }

   useEffect(() => {
      if (didMountRef.current) {
         selectColorHandler({action: 'load'})
      }
      didMountRef.current = true
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
                     onClick={(e) => selectColorHandler({action: 'click', ev: e, color: color})}
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