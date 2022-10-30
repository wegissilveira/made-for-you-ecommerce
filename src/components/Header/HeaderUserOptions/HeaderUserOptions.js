import React, { useState, useRef, useEffect } from "react"
import classes from './HeaderUserOptions.module.css'

import { NavLink, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HeaderUserOptions = (props) => {
   const {
      cart,
      wish
   } = props

   const [searchProduct, setSearchProduct] = useState(false)
   const [input, setInput] = useState('')

   const searchRef = useRef()

   // Executa a busca com o click na lupa
   const searchProductHandler = e => {
      let inputValue = e.currentTarget.parentNode.childNodes[0].value

      if (inputValue.length >= 3) {
         setSearchProduct(true)
         setInput(inputValue)
      } else {
         setSearchProduct(false)
         setInput(inputValue)
      }
   }

   // Executa a busca com o 'Enter'
   const keydownSearchHandler = e => {
      if (e.keyCode === 13) {
         if (input.length >= 3) {
            // props.history.push("/search/" + input) // => Versão de desenvolvimento
            props.history.push("/made-for-you/search/" + input)
         } else {
            alert('Search requires at least three letters')
         }
      }
   }

   useEffect(() => {
      searchRef.current.addEventListener('keydown', keydownSearchHandler)

      return () =>
         searchRef.current.removeEventListener('keydown', keydownSearchHandler)
   })

   let bag_color = cart.length > 0 ? 'green' : 'grey'
   let heart_color = wish.length > 0 ? 'red' : 'grey'

   let searchInput =
      searchProduct ?
         <NavLink to={"/search/" + input}>
            <FontAwesomeIcon
               icon="search"
               color="grey"
            />
         </NavLink>
         :
         <FontAwesomeIcon
            icon="search"
            color="grey"
            onClick={() => alert('A busca precisa ter ao menos 3 caracteres')}
         />

   return (
      <div className={classes['User-options--container']}>
         <p>+375 29 364-74-69</p>

         <ul className={classes.Account_icons}>
            <li ref={searchRef}>
               <input onChange={searchProductHandler} />
               {searchInput}
            </li>
            <li>
               <NavLink
                  className={classes.Enter_account_btn}
                  to="/user-login/"
               >
                  <FontAwesomeIcon
                     icon={['far', 'user']}
                     color="grey"
                  />
               </NavLink>
            </li>
            <li>
               <NavLink to="/wishlist/">
                  <FontAwesomeIcon
                     icon={['far', 'heart']}
                     color={heart_color}
                  />
               </NavLink>
            </li>
            <li>
               <NavLink to="/cart/">
                  <FontAwesomeIcon
                     icon='shopping-bag'
                     color={bag_color}
                  />
               </NavLink>
            </li>
         </ul>
      </div>
   )
}

export default withRouter(HeaderUserOptions)