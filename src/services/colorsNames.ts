const getColors = async () => {
   let colors: {} = []
   await fetch('https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json')
      .then(response => colors = response.json())
      .catch(err => console.error(err))

   return colors
}

export default getColors