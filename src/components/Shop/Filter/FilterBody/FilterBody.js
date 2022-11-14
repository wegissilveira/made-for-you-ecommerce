import React, { useContext } from "react"
import classes from './FilterBody.module.css'

import productsData from 'Data/productsData'

import { UpdateProductsListContext } from "../context/FilterContext"

import PriceSlider from 'components/Shop/Filter/PriceSlider/PriceSlider'
import FilterCheckbox from 'components/Shop/Filter/FilterCheckbox/FilterCheckbox'
import FilterColorSelector from 'components/Shop/Filter/FilterColorSelector/FilterColorSelector'

const checkboxItems = [
   {value: 'new', title: 'New Products'},
   {value: 'old', title: 'Old Products'},
   {value: 'best-seller', title: 'Best Sellers'},
   {value: 'sales', title: 'Sales'},
]


const FilterBody = props => {
   const {
      sliderRef
   } = props

   const { updateTag, updateCategory } = useContext(UpdateProductsListContext)

   // Categorias
   let categoriesTotalQtde = 0
   let livingRoomQtde = 0
   let bedRoomQtde = 0
   let bathRoomQtde = 0
   let kitchen = 0
   let childrenRoom = 0

   // Tipos
   let typesTotalQtde = 0
   let furnitureQtde = 0
   let accessoriesQtde = 0
   let decorationsQtde = 0
   let textileQtde = 0
   let lightingQtde = 0

   productsData.forEach(product => {
      categoriesTotalQtde++
      typesTotalQtde++
         
      switch(product.category) {
         case 'living-room':
            livingRoomQtde++
            break
         case 'bedroom':
            bedRoomQtde++
            break
         case 'bathroom':
            bathRoomQtde++
            break
         case 'kitchen':
            kitchen++
            break
         case 'children-room':
            childrenRoom++
            break
         default:
            return
      }

      switch(product.tag) {
         case 'furniture':
            furnitureQtde++
            break
         case 'accessories':
            accessoriesQtde++
            break
         case 'decorations':
            decorationsQtde++
            break
         case 'textile':
            textileQtde++
            break
         case 'lightning':
            lightingQtde++
            break
         default:
            return
      }
   })

   const setProductTag = (e, type, tag) => {
      type === 'cat' ? updateCategory(tag) : updateTag(tag)

      let elementsArr = Array.from(e.target.parentNode.children)
      elementsArr.forEach((element, i) => {
         if (i !== 0) element.className = classes.Not_Selected
      })

      e.target.className = classes.Selected
   }

   return (
      <div className={classes.Filter_Blocks}>
         <div id="categories-wrapper">
            <h6>CATEGORIES</h6>
            {/* Considerar transformar estas funções em um único componente que recebe os valores como props, talvez um array, onde o componente seria chamado uma única vez para cara filtro ou passar os valores individualmente, onde o componente seria chamado uma vez para cada item do filtro */}
            {/* O manter várias chamadas. O certo é que esta parte será extraída para um componente separado */}
            <p className={classes.Selected} onClick={e => setProductTag(e, 'cat', 'all')}>All categories ({categoriesTotalQtde}) </p>
            <p onClick={e => setProductTag(e, 'cat', 'bedroom')}>Bedroom ({bedRoomQtde}) </p>
            <p onClick={e => setProductTag(e, 'cat', 'living-room')}>Living room ({livingRoomQtde}) </p>
            <p onClick={e => setProductTag(e, 'cat', 'kitchen')}>Kitchen ({kitchen}) </p>
            <p onClick={e => setProductTag(e, 'cat', 'bathroom')}>Bathroom ({bathRoomQtde}) </p>
            <p onClick={e => setProductTag(e, 'cat', 'children-room')}>Children's room ({childrenRoom}) </p>
         </div>
         <span></span>
         <div id="types-wrapper">
            <h6>TYPE</h6>
            <p className={classes.Selected} onClick={e => setProductTag(e, 'type', 'all-products')}>All tags ({typesTotalQtde}) </p>
            <p onClick={e => setProductTag(e, 'type', 'furniture')}>Furniture ({furnitureQtde}) </p>
            <p onClick={e => setProductTag(e, 'type', 'accessories')}>Accessories ({accessoriesQtde}) </p>
            <p onClick={e => setProductTag(e, 'type', 'decorations')}>Decorations ({decorationsQtde}) </p>
            <p onClick={e => setProductTag(e, 'type', 'textile')}>Textile ({textileQtde}) </p>
            <p onClick={e => setProductTag(e, 'type', 'lightning')}>Lighting ({lightingQtde}) </p>
         </div>
         <span></span>
         <FilterCheckbox
            checkboxItems={checkboxItems}
         />
         <span></span>
         <FilterColorSelector />
         <span></span>
         <PriceSlider
            ref={sliderRef}
         />
      </div>
   )
}

export default FilterBody