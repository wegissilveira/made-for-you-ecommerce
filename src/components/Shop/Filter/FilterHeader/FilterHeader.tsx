import { useContext } from "react"
import classes from './FilterHeader.module.scss'

import { UpdateFilterListContext } from "../context/FilterContext"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Order } from "common/types"


type Props = {
   filterOpen: boolean
   openFilterHandlerCB: () => void
}

type OrderValues = {
   value: Order,
   text: string
}

const orderValues: OrderValues[] = [
   {value: 'default', text: 'Default Sorting'},
   {value: 'low-high', text: 'Price: Low to High'},
   {value: 'high-low', text: 'Price: High to Low'},
   {value: 'alphabetical', text: 'Alphabetical Order'}
]

const FilterHeader = (props: Props) => {
   const {
      filterOpen,
      openFilterHandlerCB,
   } = props

   const { updateOrder } = useContext(UpdateFilterListContext)

   const filterToggle =
      filterOpen === false ?
         ['OPEN FILTERS', 'filter'] as const :
         ['CLOSE FILTERS', 'times'] as const


   return (
      <div className={classes.FilterHeader}>
         <div onClick={() => openFilterHandlerCB()}
            className={classes.Filter_toggle}
         >
            <FontAwesomeIcon icon={filterToggle[1]} />
            <p>{filterToggle[0]}</p>
         </div>
         <div className={classes.Filter_sort}>
            <p>Sort by</p>
            <select
               onChange={e => updateOrder(e.target.value as Order)}
               id="order-filter-wrapper"
            >
               {
                  orderValues.map((option, i) => {
                    return <option key={option+'-'+i} value={option.value}>{option.text}</option>
                  })
               }
            </select>
         </div>
      </div>
   )
}

export default FilterHeader