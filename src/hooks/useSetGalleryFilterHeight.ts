import useCallResizeWarning from 'hooks/useCallResizeWarning'

const _ = undefined
const useSetGalleryFilterHeight = () => {
   const { containerHeightHandler } = useCallResizeWarning()

   const setGalleryHeight = () => {
      const filterEl = document.getElementById('filter-container') as HTMLDivElement
      const containerEl = document.getElementById('gallery-container') as HTMLDivElement
      const productCardStyle = window.getComputedStyle(containerEl)

      setTimeout(() => {
         const productCardHeight = parseInt((productCardStyle.height).match(/\d+/)![0])
         const productCardMarginTop = parseInt((productCardStyle.marginTop).match(/\d+/)![0])
         const productCardFullHeight = productCardHeight + productCardMarginTop + 478
         containerHeightHandler(_, _, _, ['filter', productCardFullHeight + 20])
         filterEl.style.height = productCardFullHeight + 20 + 'px'
      }, 1)
   }

   return setGalleryHeight
}

export default useSetGalleryFilterHeight