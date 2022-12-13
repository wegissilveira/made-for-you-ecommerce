import React, { useRef } from 'react'
import classes from './SearchComponent.module.css'

import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const SearchComponent = () => {
   const inputRef = useRef()
   const history = useHistory()

   const searchProducts = () => {
      let host = '/made-for-you/search/'
      if (window.location.hostname === "localhost" || 
         window.location.hostname === "127.0.0.1" || 
         window.location.hostname === "") 
      {
         host = '/search/'
      }
      const searchValue = inputRef.current.value
      if (searchValue.length >= 3) {
         history.push(host + searchValue)
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