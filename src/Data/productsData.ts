import { ProductType } from 'common/types'

const productsData: ProductType[] = [
    {
        _id: '16',
        name: 'Cottage Plaid Shower Curtain',
        price: '48.99',
        img: require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-1.jpg'),
        tag: 'textile',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-1.jpg'),
            require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#FFFF00'],
        deal: false,
        offer: 'new'
    },
    {
        _id: '2',
        name: 'Caladeron Sofa',
        price: '98.99',
        img: require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-1.png'),
        tag: 'furniture',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-3.jpg'),
        ],
        colors: ['#0000FF', '#008000', '#800080'],
        deal: true,
        offer: 'best-seller'
    },
    {
        _id: '13',
        name: 'Devlan Wall Art (Set of 3)',
        price: '38.99',
        img: require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#FFFF00', '#800080'],
        deal: false,
        offer: 'best-seller',
        slide: [true, '#fad3e0']
    },
    {
        _id: '4',
        name: 'Johnelle Dining Table',
        price: '38.99',
        img: require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-1.png'),
        tag: 'furniture',
        category: 'kitchen',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: false,
        offer: 'new'
    },
    {
        _id: '5',
        name: 'Keep Calm Wall Art',
        price: '38.99',
        img: require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: true,
        offer: 'new',
        slide: [true, 'rgb(151, 105, 105)']
    },
    {
        _id: '6',
        name: 'Vintasso Upholste#FF0000 Bed',
        price: '388.99',
        img: require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-1.png'),
        tag: 'furniture',
        category: 'bedroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#FFFF00', '#800080'],
        deal: true,
        offer: 'new'
    },
    {
        _id: '7',
        name: 'Rice Effect Turkish Cotton Towel',
        price: '389.90',
        img: require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-1.png'),
        tag: 'textile',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-1.png'),
            require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: false,
        offer: 'new'
    },
    {
        _id: '8',
        name: 'Carynhurst 70" TV Stand',
        price: '18.99',
        img: require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-1.png'),
        tag: 'furniture',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#0000FF'],
        deal: false,
        offer: 'old'
    },
    {
        _id: '9',
        name: 'Exquisite Poster Bed',
        price: '36.99',
        category: 'children-room',
        img: require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-1.png'),
        tag: 'textile',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-1.jpg'),
            require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-3.jpg'),
        ],
        colors: ['#0000FF', '#008000', '#800080'],
        deal: true,
        offer: 'old'
    },
    {
        _id: '10',
        name: 'Jodene Pendant Light',
        price: '500.99',
        img: require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: true,
        offer: 'best-seller',
        slide: [true, '#ccc']
    },
    {
        _id: '11',
        name: 'Aurora Brown Manufactured Wood Floor Vase',
        price: '1038.99',
        img: require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: false,
        offer: 'new',
        slide: [true, 'rgb(238, 225, 183)']
    },
    {
        _id: '12',
        name: 'Tara Space Saver Cabinet',
        price: '38.99',
        img: require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-1.png'),
        tag: 'furniture',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#0000FF', '#800080'],
        deal: true,
        offer: 'old'
    },
    {
        _id: '3',
        name: 'Prattville Accent Cabinet',
        price: '38.99',
        img:  require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-1.png'),
        tag: 'furniture',
        category: 'kitchen',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-3.jpg'),
        ],
        colors: ['#FFFF00', '#008000', '#800080'],
        deal: false,
        offer: 'old'
    },
    {
        _id: '14',
        name: 'Crosley Lydia Linen Cabinet',
        price: '318.99',
        img: require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-1.png'),
        tag: 'furniture',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#FFFF00'],
        deal: true,
        offer: 'new'
    },
    {
        _id: '15',
        name: 'iEnjoy Home Bamboo Sheet Set',
        price: '118.99',
        img: require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-1.png'),
        tag: 'textile',
        category: 'bedroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-1.png'),
            require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: true,
        offer: 'old'
    },
    {
        _id: '1',
        name: 'Tara Bathroom Mirror',
        price: '288.99',
        img: require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-1.png'),
        tag: 'decorations',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-3.jpg'),
        ],
        colors: ['#FF0000', '#008000', '#800080'],
        deal: false,
        offer: 'sales'
    },
]

export default productsData