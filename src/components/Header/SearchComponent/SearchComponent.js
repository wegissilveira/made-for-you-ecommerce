import React, { useRef } from 'react'
import classes from './SearchComponent.module.css'

import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const SearchComponent = () => {
   const inputRef = useRef()
   const history = useHistory()

   const searchProducts = () => {
      const searchValue = inputRef.current.value
      if (searchValue.length >= 3) {
         history.push("/search/" + searchValue) // => Versão de desenvolvimento
         // history.push("/made-for-you/search/" + searchValue)
      } else {
         alert('Search requires at least three letters')
      }
   }

   return (
      <div 
         className={classes['SearchProducts--wrapper']}
         onKeyDown={(e) => e.key === 'Enter' ? searchProducts() : null}
      >
         <input ref={inputRef} />
         <FontAwesomeIcon
            icon="search"
            color="grey"
            onClick={searchProducts}
         />
      </div>
   )
}

export default SearchComponent