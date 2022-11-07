import { useState } from 'react'

const useSetPageTop = () => {
   const [count, setCount] = useState(0)
   const [top, setTop] = useState()

   const setProductsPageHandler = (
      action, 
      container, 
      subContainer,
      containerHeight,
      isFilterOpen
   ) => {
      const containerEl = container.current
      const subContainerEl = subContainer.current

      let containerBottom
      if (containerHeight) {
         containerBottom = containerEl.offsetHeight
      } else {
         containerBottom = containerEl.offsetTop + containerEl.offsetHeight
      }

      const productCardStyle = window.getComputedStyle(containerEl.children[0].children[0])
      const productCardHeight = parseInt((productCardStyle.height).match(/\d+/)[0])
      const productCardMarginTop = parseInt((productCardStyle.marginTop).match(/\d+/)[0])
      const productCardFullHeight = productCardHeight + productCardMarginTop

      let newCount
      const subContainerWidth = Number((window.getComputedStyle(subContainerEl).inlineSize).replace(/[^0-9.]+/g, ""))
      const productCardWidth = Number((window.getComputedStyle(subContainerEl.children[0]).inlineSize).replace(/[^0-9.]+/g, ""))
      const itemsPerRow = Math.floor(subContainerWidth / productCardWidth)

      if (action === 'more') {
         newCount = count + itemsPerRow
      } else {
         containerBottom = top - productCardFullHeight
         newCount = count - itemsPerRow
      }

      let btnBottom
      if (containerHeight) {
         btnBottom = 290

         if (window.screen.width >= 768 && window.screen.width <= 1365) {
            btnBottom = 210
         } else if (window.screen.width >= 1366 && window.screen.width <= 1599) {
            btnBottom = -70
         } else if (window.screen.width <= 360) {
            btnBottom = 0
         }

      } else {
         btnBottom = 560

         if (window.screen.width >= 1366 && window.screen.width <= 1599) {
            btnBottom = 200
         } else if (window.screen.width <= 360) {
            btnBottom = 300
         }
      }

      let windowTop = containerBottom - btnBottom
      if (isFilterOpen) {
         if (isFilterOpen[0]) {
            windowTop = windowTop + isFilterOpen[1]
         }
      }

      window.scrollTo({ top: windowTop, left: 0, behavior: 'smooth' })
      setTop(containerBottom)
      setCount(newCount)

      const _ = undefined
      if (containerHeight) {
         containerHeight(_, _, _, [action, productCardFullHeight + 20])
      }
   }

   return { setProductsPageHandler, setCount, count }
}

export default useSetPageTop