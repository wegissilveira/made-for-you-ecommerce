import { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useLazyQuery } from '@apollo/client'
import { GET_PRODUCT } from 'services/getProduct'

const useProduct = () => {
   const history = useHistory()
   const [getProduct, { data, loading, error }] = useLazyQuery(GET_PRODUCT)
   
   const idParams = history.location.search
   const currentId = idParams.split('=')[1]

   useEffect(() => {
      getProduct({ variables: { id: currentId } })
   }, [currentId])
   
   return { data, loading, error }
} 

export default useProduct