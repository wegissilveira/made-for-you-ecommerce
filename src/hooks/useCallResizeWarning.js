import { useState, useEffect, useRef } from "react"

const useCallResizeWarning = (filterRef, containerRef, filterOpen) => {
   const [openToastify, setOpenToastify] = useState(false)
   const [resize, setResize] = useState(true)
   const [containerHeight, setContainerHeight] = useState()
   const [translateValue, setTranslateValue] = useState()
   const [filter_height, setFilterHeight] = useState()


   const containerHeightHandler = (cHeight = containerHeight, fHeight = filter_height, open = filterOpen, addRow) => {
      let height
      if (addRow) {
         console.log('ENTROU 1');
         height = addRow[0] === 'more' ? containerHeight + addRow[1] : containerHeight - addRow[1]
      } else {
         console.log('ENTROU 2');
         height = open ? containerHeight + fHeight : cHeight - fHeight
      }

      setContainerHeight(height)
      console.log('HEIGHT WARNING: ', height);
   }

   const callResizeAlert = () => {// alert('Atualize a página para que todos os componentes se ajustem às novas dimensões. Essa mensagem não aparecerá novamente nesta sessão.')
      setOpenToastify(true)
      setTimeout(() => {
         setOpenToastify(false)
      }, 8000)
      setResize(false)
      sessionStorage.setItem('warned', true)
   }

   const reportWindowSize = () => {
      const fHeight = filterRef.current.offsetHeight

      setTranslateValue(-fHeight)
      setFilterHeight(fHeight)

      setTimeout(() => {
         const containerHeight = containerRef.current.offsetHeight
         containerHeightHandler(containerHeight, fHeight)
      }, 30)
   }

   const observer = useRef(
      new ResizeObserver(() => {
         const windowWidth = window.innerWidth
         const loadWidth = sessionStorage.getItem('windowWidth')
         const rendered = sessionStorage.getItem('rendered')
         if (rendered && windowWidth != loadWidth) {
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
         sessionStorage.setItem('rendered', true)
         sessionStorage.setItem('windowWidth', loadWidth)
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