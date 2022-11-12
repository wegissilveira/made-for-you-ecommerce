import React from "react"
import classes from './FilterBody.module.css'

import productsData from 'Data/productsData'

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
      categoriesRef,
      typesRef,
      offerRef,
      setOfferCB,
      sliderRef,
      lastSelectedColorHandlerCB,
      selectColorHandlerCB,
      setPriceRangeCB,
      setProductTypeHandlerCB
   } = props

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
      //Categorias
      categoriesTotalQtde++

      // Mudar esses 'ifs' pra um switch-case
      for (let i in product) {
         if (product[i].toString().match('living-room')) {
            livingRoomQtde++
         }
         if (product[i].toString().match('bedroom')) {
            bedRoomQtde++
         }
         if (product[i].toString().match('bathroom')) {
            bathRoomQtde++
         }
         if (product[i].toString().match('kitchen')) {
            kitchen++
         }
         if (product[i].toString().match('children-room')) {
            childrenRoom++
         }
      }

      // Tipos
      typesTotalQtde++
      for (let i in product) {
         if (product[i].toString().match('furniture')) {
            furnitureQtde++
         }
         if (product[i].toString().match('accessories')) {
            accessoriesQtde++
         }
         if (product[i].toString().match('decorations')) {
            decorationsQtde++
         }
         if (product[i].toString().match('textile')) {
            textileQtde++
         }
         if (product[i].toString().match('lightning')) {
            lightingQtde++
         }
      }

   })

   return (
      <div className={classes.Filter_Blocks}>
         <div ref={categoriesRef}>
            <h6>CATEGORIES</h6>
            {/* Considerar transformar estas funções em um único componente que recebe os valores como props, talvez um array, onde o componente seria chamado uma única vez para cara filtro ou passar os valores individualmente, onde o componente seria chamado uma vez para cada item do filtro */}
            <p className={classes.Selected} onClick={e => setProductTypeHandlerCB(e, 'cat', 'all')}>All categories ({categoriesTotalQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'cat', 'bedroom')}>Bedroom ({bedRoomQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'cat', 'living-room')}>Living room ({livingRoomQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'cat', 'kitchen')}>Kitchen ({kitchen}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'cat', 'bathroom')}>Bathroom ({bathRoomQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'cat', 'children-room')}>Children's room ({childrenRoom}) </p>
         </div>
         <span></span>
         <div ref={typesRef}>
            <h6>TYPE</h6>
            <p className={classes.Selected} onClick={e => setProductTypeHandlerCB(e, 'type', 'all-products')}>All tags ({typesTotalQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'type', 'furniture')}>Furniture ({furnitureQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'type', 'accessories')}>Accessories ({accessoriesQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'type', 'decorations')}>Decorations ({decorationsQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'type', 'textile')}>Textile ({textileQtde}) </p>
            <p onClick={e => setProductTypeHandlerCB(e, 'type', 'lightning')}>Lighting ({lightingQtde}) </p>
         </div>
         <span></span>
         <FilterCheckbox
            checkboxItems={checkboxItems}
            offerRef={offerRef}
            setOfferCB={e => setOfferCB(e)}
         />
         <span></span>
         <FilterColorSelector
            lastSelectedColorHandlerCB={lastSelectedColorHandlerCB}
            selectColorHandlerCB={selectColorHandlerCB}
         />
         <span></span>
         <PriceSlider
            rangeValues={setPriceRangeCB}
            ref={sliderRef}
         />
      </div>
   )
}

export default FilterBody