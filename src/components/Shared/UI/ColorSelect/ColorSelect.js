import React from 'react'

import classes from './ColorSelect.module.css'

const ColorSelect = props => {

   let opacityArr = Array(props.colors.length).fill('0.4')

   let borderArr = Array(props.colors.length).fill('1px solid black')

   let [opacity, setOpacity] = React.useState(opacityArr)
   let [border, setBorder] = React.useState(borderArr)

   const selectColorHandler = (color, load) => {
      let newBorder = [...border]
      let newOpacity = [...opacity]

      props.colors.forEach((bColor, k) => {
         if (color === bColor) {
            newBorder[k] = '2px solid black'
            newOpacity[k] = '1.0'
         } else {
            newBorder[k] = '1px solid black'
            newOpacity[k] = '0.4'
         }
      })

      setBorder(newBorder)
      setOpacity(newOpacity)

      if (load !== true) props.selectColorHandlerCallback(color)
   }

   React.useEffect(() => {
      if (props.selectedColor !== undefined) {
         selectColorHandler(props.selectedColor, true)
      }
   }, [])



   return (
      <div className={classes.Color_select_container}>
         {
            props.colors.map((color, i) => {
               return <div key={i}
                  style={{ border: border[i] }}

                  onClick={() => selectColorHandler(color)}
               >
                  <span
                     style={{ backgroundColor: color, opacity: opacity[i] }}
                  >
                  </span>
               </div>
            })
         }
      </div>
   )
}

export default ColorSelect