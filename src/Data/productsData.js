const productsData = [
    {
        _id: '16',
        name: 'Produto-16',
        price: '48.99',
        img: require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-1.jpg'),
        tag: 'textile',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-1.jpg'),
            require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/Cortina-1/cortina-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'yellow'],
        deal: false,
        offer: 'new'
    },
    {
        _id: '2',
        name: 'Sofá-2',
        price: '98.99',
        img: require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-1.png'),
        tag: 'furniture',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Sofa-2/sofa-2-img-3.jpg'),
        ],
        colors: ['blue', 'green', 'purple'],
        deal: true,
        offer: 'best-seller'
    },
    {
        _id: '13',
        name: 'Produto-13',
        price: '38.99',
        img: require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Quadro-1/quadro-1-img-3.jpg'),
        ],
        colors: ['red', 'yellow', 'purple'],
        deal: false,
        offer: 'best-seller',
        slide: [true, '#fad3e0']
    },
    {
        _id: '4',
        name: 'Produto-4',
        price: '38.99',
        img: require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-1.png'),
        tag: 'furniture',
        category: 'kitchen',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Mesa-2/mesa-2-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: false,
        offer: 'new'
    },
    {
        _id: '5',
        name: 'Produto-5',
        price: '38.99',
        img: require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Quadro-2/quadro-2-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: true,
        offer: 'new',
        slide: [true, 'rgb(151, 105, 105)']
    },
    {
        _id: '6',
        name: 'Cama-1',
        price: '388.99',
        img: require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-1.png'),
        tag: 'furniture',
        category: 'bedroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/cama-1/cama-1-img-3.jpg'),
        ],
        colors: ['red', 'yellow', 'purple'],
        deal: true,
        offer: 'new'
    },
    {
        _id: '7',
        name: 'Produto-7',
        price: '389.90',
        img: require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-1.png'),
        tag: 'textile',
        category: 'kitchen',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-1.png'),
            require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/panoPrato-1/panoPrato-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: false,
        offer: 'new'
    },
    {
        _id: '8',
        name: 'Estante-1',
        price: '18.99',
        img: require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-1.png'),
        tag: 'furniture',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/estante-1/estante-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'blue'],
        deal: false,
        offer: 'old'
    },
    {
        _id: '9',
        name: 'Produto-9',
        price: '36.99',
        category: 'children-room',
        img: require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-1.png'),
        tag: 'textile',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-1.jpg'),
            require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/jogo-cama-infantil-1/jogo-cama-infantil-1-img-3.jpg'),
        ],
        colors: ['blue', 'green', 'purple'],
        deal: true,
        offer: 'old'
    },
    {
        _id: '10',
        name: 'Produto-10',
        price: '500.99',
        img: require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-1.png'),
        tag: 'decorations',
        category: 'living-room',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Luminaria-1/luminaria-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: true,
        offer: 'best-seller',
        slide: [true, '#ccc']
    },
    {
        _id: '11',
        name: 'Produto-11',
        price: '1038.99',
        img: require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-1.png'),
        tag: 'decorations',
        category: 'kitchen',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Vaso-1/vaso-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: false,
        offer: 'new',
        slide: [true, 'rgb(238, 225, 183)']
    },
    {
        _id: '12',
        name: 'Produto-12',
        price: '38.99',
        img: require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-1.png'),
        tag: 'furniture',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Gabinete-1/gabinete-1-img-3.jpg'),
        ],
        colors: ['red', 'blue', 'purple'],
        deal: true,
        offer: 'old'
    },
    {
        _id: '3',
        name: 'Produto-3',
        price: '38.99',
        img:  require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-1.png'),
        tag: 'furniture',
        category: 'kitchen',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Armario-1/armario-1-img-3.jpg'),
        ],
        colors: ['yellow', 'green', 'purple'],
        deal: false,
        offer: 'old'
    },
    {
        _id: '14',
        name: 'Produto-14',
        price: '318.99',
        img: require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-1.png'),
        tag: 'furniture',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-1.png'),
            require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-2.jpg'),
            require('../assets/images/ProductCard/Furniture/Gabinete-2/gabinete-2-img-3.jpg'),
        ],
        colors: ['red', 'green', 'yellow'],
        deal: true,
        offer: 'new'
    },
    {
        _id: '15',
        name: 'Coxa-1',
        price: '118.99',
        img: require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-1.png'),
        tag: 'textile',
        category: 'bedroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-1.png'),
            require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-2.jpg'),
            require('../assets/images/ProductCard/Textile/Coxa-1/coxa-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: true,
        offer: 'old'
    },
    {
        _id: '1',
        name: 'Produto-1',
        price: '288.99',
        img: require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-1.png'),
        tag: 'decorations',
        category: 'bathroom',
        imgsDemo: [
            require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-1.png'),
            require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-2.jpg'),
            require('../assets/images/ProductCard/Decorations/Espelho-1/espelho-1-img-3.jpg'),
        ],
        colors: ['red', 'green', 'purple'],
        deal: false,
        offer: 'sales'
    },
]

export default productsData