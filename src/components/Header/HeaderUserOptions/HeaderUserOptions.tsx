import classes from './HeaderUserOptions.module.scss'

import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'

import { ProductCartType, InitialState } from 'common/types'

import SearchComponent from "../SearchComponent/SearchComponent"


type Props = {
   cart: ProductCartType[]
   wish: string[]
}

const HeaderUserOptions = (props: Props) => {
   const {
      cart,
      wish
   } = props
   
   const bagColor = cart.length > 0 ? 'green' : 'grey'
   const heartColor = wish.length > 0 ? 'red' : 'grey'

   return (
      <div className={classes['User-options--container']}>
         <p>+375 29 364-74-69</p>

         <ul className={classes.Account_icons}>
            <SearchComponent />
            <li>
               <NavLink
                  className={classes.Enter_account_btn}
                  to={`${process.env.PUBLIC_URL}/user-login/`}
               >
                  <FontAwesomeIcon
                     icon={['far', 'user']}
                     color="grey"
                  />
               </NavLink>
            </li>
            <li>
               <NavLink to={`${process.env.PUBLIC_URL}/wishlist/`}>
                  <FontAwesomeIcon
                     icon={['far', 'heart']}
                     color={heartColor}
                  />
               </NavLink>
            </li>
            <li>
               <NavLink to={`${process.env.PUBLIC_URL}/cart/`}>
                  <FontAwesomeIcon
                     icon='shopping-bag'
                     color={bagColor}
                  />
               </NavLink>
            </li>
         </ul>
      </div>
   )
}

const mapStateToProps = (state: InitialState) => {
   return {
      wish: state.wishlistState,
      cart: state.cartListState
   }
}


export default connect(mapStateToProps)(HeaderUserOptions)