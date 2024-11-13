import { useState } from "react"
import classes from "./RegisterProduct.module.scss"
import { useMutation } from "@apollo/client"
import { ADD_PRODUCTS_CATALOG } from "services/addProductsCatalog"
import { ProductType } from "common/types"
import { ProductTypeTest } from "./helpers/convertFile"
import { handleFileUpload } from "./helpers/convertFile"

/**
 * Component to register products in the database.
 *
 * This component allows the user to select an Excel file containing the products
 * data. The file is then read and the products are added to the database.
 *
 * The component displays a button to add the products to the database, which is
 * only enabled if a file has been selected. The component also displays the
 * name and size of the selected file.
 *
 * @returns A JSX element with a file input and a button to add the products to
 * the database.
 */
const RegisterProduct = () => {
   const [file, setFile] = useState<File | null>(null)
   const [productsList, setProductsList] = useState<ProductTypeTest[] | null>(null)
   const [addProducts] = useMutation(ADD_PRODUCTS_CATALOG)

   const handleAddProducts = async () => {
      try {
         const { data } = await addProducts({
            variables: { products: productsList },
         })
      } catch (error) {
         console.error("Error adding products:", error)
      }
   }

   const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const selectedFile = event.target.files ? event.target.files[0] : null

      if (selectedFile) {
         const data = await handleFileUpload(selectedFile)
         setFile(selectedFile)
         setProductsList(data)
      }
   }

   return (
      <div className={classes.RegisterProduct_container}>
         <h1>Products Registration</h1>
         <div className={classes.RegisterProduct_subContainer}>
            <button onClick={handleAddProducts} disabled={!productsList}>
               Add Products
            </button>
            <label htmlFor="file-upload" className={classes.CustomFileUpload}>
               {file ? "Change File" : "Select File"}
            </label>
            <input
               id="file-upload"
               type="file"
               accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
               onChange={handleFileChange}
               style={{ display: "none" }}
            />
            <div>
               {file ? <p>Selected File: {file.name}</p> : 'No file selected'}
            </div>
         </div>
      </div>
   )
}

export default RegisterProduct
