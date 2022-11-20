import { useEffect, useState } from 'react'

import productsData from 'Data/productsData'
import { useParams, useHistory } from "react-router-dom";

const useProduct = (id) => {
   const [product, setProducts] = useState({})
   let params = useParams();
   let history = useHistory();
   console.log('PARAMS: ', params);
   console.log('history: ', history);
   const currentId = id || params.id
   
   useEffect(() => {
      const product = productsData.find(product => product._id === currentId)      
      setProducts(product)
   }, [])
   
   return product
} 

export default useProduct