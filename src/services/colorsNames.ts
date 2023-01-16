import { HEX } from "common/types"

type ColorList = {
   colorName: string
   colorHex: HEX
}

const getColors = async () => {
   let colors: ColorList = {} as ColorList
   await fetch('https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json')
      .then((response: Record<string, any> = {}) => colors = response.json())
      .catch(err => console.error(err))

   return colors
}

export default getColors