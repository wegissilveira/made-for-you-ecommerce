import { useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { GET_PRODUCTS } from "services/getProducts"

const useGetProducts = (autoFetch = false) => {
   const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS)

   useEffect(() => {
      if (autoFetch) {
         getProducts()
      }
   }, [autoFetch, getProducts])

   return { getProducts, data, loading, error }
}

export default useGetProducts
