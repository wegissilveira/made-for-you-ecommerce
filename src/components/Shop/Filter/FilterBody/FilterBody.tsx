import { useContext } from "react"
import classes from './FilterBody.module.scss'

import productsData from 'Data/productsData'

import { UpdateFilterListContext } from "../context/FilterContext"

import { Tag, Category, OfferOptions } from "common/types"

import PriceSlider from 'components/Shop/Filter/PriceSlider/PriceSlider'
import FilterCheckbox from 'components/Shop/Filter/FilterCheckbox/FilterCheckbox'
import FilterColorSelector from 'components/Shop/Filter/FilterColorSelector/FilterColorSelector'


type Cat = {
   type: 'cat'
   tag: Category
}

type Dep = {
   type: 'department'
   tag: Tag
}

type Type = Cat | Dep

enum TagType {
   CAT_TYPE = 'cat',
   DEP_TYPE = 'department',
}

const checkboxItems: OfferOptions[] = [
   {value: 'new', title: 'New Products'},
   {value: 'old', title: 'Old Products'},
   {value: 'best-seller', title: 'Best Sellers'},
   {value: 'sales', title: 'Sales'},
]

const FilterBody = () => {
   const { updateTag, updateCategory } = useContext(UpdateFilterListContext)

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

   const setProductTagHandler = (e: React.MouseEvent<HTMLButtonElement>, type: Type) => {
      type.type === TagType.CAT_TYPE ? updateCategory(type.tag) : updateTag(type.tag)

      const changeTagEl = e.target as HTMLDivElement
      const elementsArr = Array.from(changeTagEl.parentNode!.children)
      elementsArr.forEach((element, i) => {
         if (i !== 0) element.className = classes.Not_Selected
      })

      changeTagEl.className = classes.Selected
   }

   return (
      <div className={classes.Filter_Blocks}>
         <div id="categories-wrapper">
            <h6>CATEGORIES</h6>
            <button className={classes.Selected} onClick={e => setProductTagHandler(e, {type: TagType.CAT_TYPE, tag: 'all'})}>All categories ({categoriesTotalQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.CAT_TYPE, tag: 'bedroom'})}>Bedroom ({bedRoomQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.CAT_TYPE, tag: 'living-room'})}>Living room ({livingRoomQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.CAT_TYPE, tag: 'kitchen'})}>Kitchen ({kitchen}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.CAT_TYPE, tag: 'bathroom'})}>Bathroom ({bathRoomQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.CAT_TYPE, tag: 'children-room'})}>Children's room ({childrenRoom}) </button>
         </div>
         <span></span>
         <div id="types-wrapper">
            <h6>TYPE</h6>
            <button className={classes.Selected} onClick={e => setProductTagHandler(e, {type: TagType.DEP_TYPE, tag: 'all-products'})}>All tags ({typesTotalQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.DEP_TYPE, tag: 'furniture'})}>Furniture ({furnitureQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.DEP_TYPE, tag: 'accessories'})}>Accessories ({accessoriesQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.DEP_TYPE, tag: 'decorations'})}>Decorations ({decorationsQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.DEP_TYPE, tag: 'textile'})}>Textile ({textileQtde}) </button>
            <button onClick={e => setProductTagHandler(e, {type: TagType.DEP_TYPE, tag: 'lightning'})}>Lighting ({lightingQtde}) </button>
         </div>
         <span></span>
         <FilterCheckbox checkboxItems={checkboxItems} />
         <span></span>
         <FilterColorSelector/>
         <span></span>
         <PriceSlider />
      </div>
   )
}

export default FilterBody