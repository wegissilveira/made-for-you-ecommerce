import { useState, useEffect, useRef } from "react"

const useCallResizeWarning = (filterRef: React.RefObject<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>, filterOpen: boolean) => {
   const [openToastify, setOpenToastify] = useState(false)
   const [resize, setResize] = useState(true)
   const [containerHeight, setContainerHeight] = useState(0)
   const [translateValue, setTranslateValue] = useState(0)
   const [filter_height, setFilterHeight] = useState(0)


   const containerHeightHandler = (cHeight = containerHeight, fHeight = filter_height, open = filterOpen, addRow?: ['more' | 'less', number]) => {
      let height

      if (addRow) {
         height = addRow[0] === 'more' ? containerHeight + addRow[1] : containerHeight - addRow[1]
      } else {
         height = open ? containerHeight + fHeight : cHeight - fHeight
      }

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
      if (filterRef.current) {
         const fHeight = filterRef.current.offsetHeight

         setTranslateValue(-fHeight)
         setFilterHeight(fHeight)

         setTimeout(() => {
            if (containerRef.current) {
               const containerHeight = containerRef.current.offsetHeight
               containerHeightHandler(containerHeight, fHeight)
            }
         }, 30)
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
      if (containerRef.current) {
         const body = document.getElementsByTagName('BODY')[0]
         if (resize) {
            observer.current.observe(body)
         } else {
            observer.current.unobserve(body)
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