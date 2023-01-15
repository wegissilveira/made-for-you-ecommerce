import { useState, useEffect, useRef } from "react"

const useCallResizeWarning = (containerRef: React.RefObject<HTMLDivElement>) => {
   const [openToastify, setOpenToastify] = useState(false)
   const [resize, setResize] = useState(true)
   
   const callResizeAlert = () => {// alert('Atualize a página para que todos os componentes se ajustem às novas dimensões. Essa mensagem não aparecerá novamente nesta sessão.')
      setOpenToastify(true)
      setTimeout(() => {
         setOpenToastify(false)
      }, 8000)
      setResize(false)
      sessionStorage.setItem('warned', JSON.stringify(true))
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

   return { openToastify }
}

export default useCallResizeWarning