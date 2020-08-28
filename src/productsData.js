const products = [
    {
        _id: '1',
        name: 'Produto-1',
        price: '48.99',
        img: require('./assets/images/Products/molde-textile.png'),
        tag: 'textile',
        imgsDemo: [
            require('./assets/images/ProductCard/Textile/img-1.png'),
            require('./assets/images/ProductCard/Textile/img-2.png'),
            require('./assets/images/ProductCard/Textile/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '2',
        name: 'Produto-2',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '3',
        name: 'Produto-3',
        price: '38.99',
        img: require('./assets/images/Products/molde-decorations.png'),
        tag: 'decorations',
        imgsDemo: [
            require('./assets/images/ProductCard/Decorations/img-1.png'),
            require('./assets/images/ProductCard/Decorations/img-2.png'),
            require('./assets/images/ProductCard/Decorations/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '4',
        name: 'Produto-4',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '5',
        name: 'Produto-5',
        price: '38.99',
        img: require('./assets/images/Products/molde-decorations.png'),
        tag: 'decorations',
        imgsDemo: [
            require('./assets/images/ProductCard/Decorations/img-1.png'),
            require('./assets/images/ProductCard/Decorations/img-2.png'),
            require('./assets/images/ProductCard/Decorations/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '6',
        name: 'Produto-6',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '7',
        name: 'Produto-7',
        price: '38.99',
        img: require('./assets/images/Products/molde-textile.png'),
        tag: 'textile',
        imgsDemo: [
            require('./assets/images/ProductCard/Textile/img-1.png'),
            require('./assets/images/ProductCard/Textile/img-2.png'),
            require('./assets/images/ProductCard/Textile/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '8',
        name: 'Produto-8',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '9',
        name: 'Produto-9',
        price: '38.99',
        img: require('./assets/images/Products/molde-textile.png'),
        tag: 'textile',
        imgsDemo: [
            require('./assets/images/ProductCard/Textile/img-1.png'),
            require('./assets/images/ProductCard/Textile/img-2.png'),
            require('./assets/images/ProductCard/Textile/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '10',
        name: 'Produto-10',
        price: '38.99',
        img: require('./assets/images/Products/molde-decorations.png'),
        tag: 'decorations',
        imgsDemo: [
            require('./assets/images/ProductCard/Decorations/img-1.png'),
            require('./assets/images/ProductCard/Decorations/img-2.png'),
            require('./assets/images/ProductCard/Decorations/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '11',
        name: 'Produto-11',
        price: '38.99',
        img: require('./assets/images/Products/molde-decorations.png'),
        tag: 'decorations',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '12',
        name: 'Produto-12',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '13',
        name: 'Produto-13',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: false
    },
    {
        _id: '14',
        name: 'Produto-14',
        price: '38.99',
        img: require('./assets/images/Products/molde-furniture.png'),
        tag: 'furniture',
        imgsDemo: [
            require('./assets/images/ProductCard/Furniture/img-1.png'),
            require('./assets/images/ProductCard/Furniture/img-2.png'),
            require('./assets/images/ProductCard/Furniture/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '15',
        name: 'Produto-15',
        price: '38.99',
        img: require('./assets/images/Products/molde-textile.png'),
        tag: 'textile',
        imgsDemo: [
            require('./assets/images/ProductCard/Textile/img-1.png'),
            require('./assets/images/ProductCard/Textile/img-2.png'),
            require('./assets/images/ProductCard/Textile/img-3.png'),
        ],
        deal: true
    },
    {
        _id: '16',
        name: 'Produto-16',
        price: '38.99',
        img: require('./assets/images/Products/molde-decorations.png'),
        tag: 'decorations',
        imgsDemo: [
            require('./assets/images/ProductCard/Decorations/img-1.png'),
            require('./assets/images/ProductCard/Decorations/img-2.png'),
            require('./assets/images/ProductCard/Decorations/img-3.png'),
        ],
        deal: false
    },
]

export default products