import { useEffect, useState } from 'react'

import productsData from 'Data/productsData'
import { useHistory } from "react-router-dom"

const useProduct = (id) => {
   const [product, setProducts] = useState({})
   const history = useHistory()
   
   const idParams = history.location.search
   const currentId = idParams.split('=')[1]

   useEffect(() => {
      const product = productsData.find(product => product._id === currentId)      
      setProducts(product)
   }, [])
   
   return product
} 

export default useProduct