import React from "react"
import { useParams } from "react-router-dom"

const CategoryHeader = () => {
   const params = useParams()

   return (
      <>
         {params.cat && <h1>{params.cat.toUpperCase()}</h1>}
         {params.searchKey && <h1>SEARCH: '{params.searchKey.toUpperCase()}'</h1>}
      </>
   )
}

export default CategoryHeader