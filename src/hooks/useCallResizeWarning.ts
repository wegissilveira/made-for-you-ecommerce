import { useState, useEffect, useRef } from "react"

import { GalleryQty } from "common/types"

const useCallResizeWarning = (filterRef?: React.RefObject<HTMLDivElement>, containerRef?: React.RefObject<HTMLDivElement>, filterOpen?: boolean) => {
   const [openToastify, setOpenToastify] = useState(false)
   const [resize, setResize] = useState(true)
   const [containerHeight, setContainerHeight] = useState(0)
   const [translateValue, setTranslateValue] = useState(0)
   const [filter_height, setFilterHeight] = useState(0)


   const containerHeightHandler = (cHeight = containerHeight, fHeight = filter_height, open = filterOpen, addRow?: [GalleryQty, number]) => {
      let height: number = cHeight      
      
      if (addRow) {
         switch (addRow[0]) {
            case 'more':
               height = cHeight + addRow[1]
               break
            case 'less':
               height = cHeight - addRow[1]
               break
            case 'filter':
               height = addRow[1]
               break
            default:
               return
         }
      } else {
         height = open ? cHeight + fHeight : cHeight - fHeight
      }
      console.log('HOOK OPEN HEIGHT: ', height);
      console.log('HOOK OPEN: ', open);
      console.log('HOOK containerHeight: ', containerHeight);
      
      setContainerHeight(height)
   }

   const callResizeAlert = () => {// alert('Atualize a página para que todos os componentes se ajustem às novas dimensões. Essa mensagem não aparecerá novamente nesta sessão.')
      setOpenToastify(true)
      setTimeout(() => {
         setOpenToastify(false)
      }, 8000)
      setResize(false)
      sessionStorage.setItem('warned', JSON.stringify(true))
   }

   const reportWindowSize = () => {
      if  (filterRef) {
         if (filterRef.current) {
            const fHeight = filterRef.current.offsetHeight
   
            setTranslateValue(-fHeight)
            setFilterHeight(fHeight)
   
            if (containerRef) {
               setTimeout(() => {
                  if (containerRef.current) {
                     const containerHeight = containerRef.current.offsetHeight
                     containerHeightHandler(containerHeight, fHeight)
                  }
               }, 30)
            }
         }
      }
   }

   const observer = useRef(
      new ResizeObserver(() => {
         const windowWidth = window.innerWidth.toString()
         const loadWidth = sessionStorage.getItem('windowWidth')
         const rendered = sessionStorage.getItem('rendered')
         if (rendered && windowWidth !== loadWidth) {
            callResizeAlert()
         }
      })
   )

   useEffect(() => {
      reportWindowSize()
   }, [])

   useEffect(() => {
      sessionStorage.removeItem('rendered')
      const loadWidth = window.innerWidth

      setTimeout(() => {
         sessionStorage.setItem('rendered', JSON.stringify(true))
         sessionStorage.setItem('windowWidth', JSON.stringify(loadWidth))
      }, 1000)
   }, [])

   useEffect(() => {
      const warned = sessionStorage.getItem('warned')
      if (warned) {
         setResize(false)
      }
   }, [])

   useEffect(() => {
      if (containerRef) {
         if (containerRef.current) {
            const body = document.getElementsByTagName('BODY')[0]
            if (resize) {
               observer.current.observe(body)
            } else {
               observer.current.unobserve(body)
            }
         }
      }
   })

   return { 
      containerHeightHandler, 
      reportWindowSize, 
      translateValue, 
      filter_height, 
      openToastify,
      containerHeight
   }
}

export default useCallResizeWarning