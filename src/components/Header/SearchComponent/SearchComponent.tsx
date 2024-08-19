import React, { useRef } from 'react'
import classes from './SearchComponent.module.scss'

import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const SearchComponent = () => {
   const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
   const history = useHistory()

   const verifyLocalhost = (hostname: string) => {
      const host = '/made-for-you/search/'
      switch (hostname) {
         case 'localhost':
            return `${process.env.PUBLIC_URL}/search/`
         case '127.0.0.1':
            return `${process.env.PUBLIC_URL}/search/`
         case '':
            return `${process.env.PUBLIC_URL}/search/`
         default:
            return host
      }
   }

   const searchProducts = () => {
      const host = verifyLocalhost(window.location.hostname)     
      const searchValue = inputRef.current.value
      
      if (searchValue.length >= 3) {
         history.push(host + searchValue)
      } else {
         alert('Search requires at least three letters')
      }
   }

   return (
      <div className={classes['SearchProducts--wrapper']}>
         <input 
            ref={inputRef} 
            onKeyDown={(e) => e.key === 'Enter' ? searchProducts() : null}
         />
         <FontAwesomeIcon
            icon="search"
            color="grey"
            onClick={searchProducts}
         />
      </div>
   )
}

export default SearchComponent