import { useEffect, useState } from 'react'

import productsData from 'Data/productsData'
import { useHistory } from "react-router-dom"

import { ProductType } from 'common/types'


const useProduct = () => {
   const [product, setProducts] = useState<ProductType>({} as ProductType)
   const history = useHistory()   
   
   const idParams = history.location.search
   const currentId = idParams.split('=')[1]

   useEffect(() => {
      const product = productsData.find(product => product._id === currentId)           
      if (product) setProducts(product)
   }, [])
   
   return product
} 

export default useProduct