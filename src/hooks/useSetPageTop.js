import { useEffect } from 'react'


const useSetPageTop = (count) => {
   useEffect(() => {
      const containerEl = document.getElementById('gallery-container')
      const bottomBody = document.body.getBoundingClientRect().bottom
      const heightBody = document.body.getBoundingClientRect().height
      const bottomGallery = containerEl.getBoundingClientRect().bottom
      const screenHeight = window.innerHeight
      const bottomGalleryToBody = bottomBody - bottomGallery
      const generalTop = heightBody - bottomGalleryToBody
      const finalTop = (generalTop - screenHeight) + 30   

      window.scrollTo({ 
         top: finalTop, left: 0, 
         behavior: 'smooth' 
      })
   }, [count])
}

export default useSetPageTop