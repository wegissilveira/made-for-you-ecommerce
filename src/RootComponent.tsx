import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { cartListDataFn, wishlistDataFn } from 'services'
import { ActionTypesGlobal } from 'store/actions/actionTypes'
import useGetProducts from './hooks/useGetProducts'
import App from 'App'

const RootComponent = () => {
   const dispatch = useDispatch()
   const { data, loading, error } = useGetProducts(true)

   useEffect(() => {
      if (data && !loading && !error) {
         dispatch({
            type: ActionTypesGlobal.LOAD_CATALOG,
            catalog: data.products,
         })
      }
   }, [data, loading, error, dispatch])

   useEffect(() => {
      dispatch({
         type: ActionTypesGlobal.CARTLIST,
         cartList: cartListDataFn(),
      })

      dispatch({
         type: ActionTypesGlobal.WISHLIST,
         wishlist: wishlistDataFn(),
      })
   }, [dispatch])

   return <App />
}

export default RootComponent