import * as XLSX from "xlsx"
import { 
   // ProductType,
   Tag,
   Category,
   Offer
} from "common/types"

export type ProductTypeTest = {
   name: string
   price: number
   img: string
   tag: Tag
   category: Category
   imgsDemo: string[]
   colors: string[]
   deal: boolean
   offer: Offer
}

/**
 * Handles the file upload by reading the file, parsing it as CSV data, and resolving with the data array.
 *
 * @param {File} file - The file to be uploaded
 * @return {Promise<ProductTypeTest[]>} A promise that resolves with the parsed CSV data array
 */
export const handleFileUpload = async (file: File): Promise<ProductTypeTest[]> => {
   return new Promise((resolve, reject) => {
     const reader = new FileReader()
 
     reader.onload = (e: ProgressEvent<FileReader>) => {
       const result = e.target?.result
       if (result) {
         const data = new Uint8Array(result as ArrayBuffer)
         const workbook = XLSX.read(data, { type: 'array' })
         const sheetName = workbook.SheetNames[0]
         const sheet = workbook.Sheets[sheetName]
 
         const rawData = XLSX.utils.sheet_to_json(sheet, {
           header: ['name', 'price', 'img', 'tag', 'category', 'imgsDemo', 'colors', 'deal', 'offer'],
           defval: ''
         })
 
         const jsonData: ProductTypeTest[] = (rawData as any[]).map((row) => ({
           name: String(row.name),
           price: parseFloat(row.price) || 0,
           img: String(row.img),
           tag: row.tag,
           category: row.category,
           imgsDemo: String(row.imgsDemo).split(',').map((img: string) => img.trim()),
           colors: String(row.colors).split(',').map((color: string) => color.trim()),
           deal: row.deal === 'true' || row.deal === true,
           offer: row.offer
         }))
 
         jsonData.shift()
 
         resolve(jsonData)
       } else {
         reject(new Error('Error reading file data'))
       }
     }
 
     reader.onerror = (error) => {
       reject(error)
     }
 
     reader.readAsArrayBuffer(file)
   })
 }
