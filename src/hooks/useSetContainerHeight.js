import { useState, useEffect } from "react"

const useContainerHeight = () => {
   const [height, setHeight] = useState(0)
   const containerEl = document.getElementById('gallery-container').offsetHeight
   const setContainerHeight = (action) => {
      console.log('HEIGHT HOOK-1: ', height);
      const containerEl = document.getElementById('gallery-container')
      // const productCardStyle = window.getComputedStyle(containerEl.children[0].children[0])
      // const productCardHeight = parseInt((productCardStyle.height).match(/\d+/)[0])
      // const productCardMarginTop = parseInt((productCardStyle.marginTop).match(/\d+/)[0])
      // const productCardFullHeight = (productCardHeight + productCardMarginTop) + 20

      // let newHeight = action === 'more' ? height + productCardFullHeight : height - productCardFullHeight

      // console.log('action: ', action);
      // console.log('height: ', height);
      // console.log('productCardMarginTop: ', productCardMarginTop);
      // console.log('containerEl HEIGHT: ', containerEl.offsetHeight);
      // console.log('productCardFullHeight: ', productCardFullHeight);

      // setHeight(newHeight)
      setHeight(containerEl.offsetHeight)
   }
   console.log('HEIGHT HOOK: ', height);

   useEffect(() => {
      // console.log('HEIGHT EL: ', document.getElementById('gallery-container').offsetHeight);
      setContainerHeight()
   }, [])

   return { setContainerHeight, height}
}

export default useContainerHeight