import { useParams } from "react-router-dom"
import { SearchParams } from 'common/types'

const CategoryHeader = () => {
   const { searchKey, cat} = useParams<SearchParams>()

   return (
      <>
         {cat && <h1>{cat.toUpperCase()}</h1>}
         {searchKey && <h1>SEARCH: '{searchKey.toUpperCase()}'</h1>}
      </>
   )
}

export default CategoryHeader