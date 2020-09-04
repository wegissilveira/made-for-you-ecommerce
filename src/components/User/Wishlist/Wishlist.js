import React from 'react'

import './Wishlist.css'

import Products from '../../Shared/Products/Products'

import wishlist from '../../../wishlistData'

const Wishlist = props => {

    // Eu estou realizando o fetch dos produtos diretamente em 'Products', o que até aqui tem funcionado bem, no entanto me parece melhor realizar o fetch no parent para deixar os dados enviados como props mais dinâmicos e flexíveis.
    // Aqui a minha ideia é ao favoritar um produto, salvar o seu id em uma tabela, realizar o fetch aqui e extrair somente os produtos que coincidirem com os ids salvos na tabela de produtos. Os dados extraídos serão salvos em um novo array, que será enviado como props para 'Products'.
    // Uma segunda possibilidade é realizar o fetch somente da tabela de ids aqui, enviar um array com tais ids como props para 'products' e lá realizar a comparação entre os ids e os produtos, o que geraria um array somente com os produtos favoritos. Isso manteria o fetch de produtos lá. No entanto a minha apreensão é em relação à complexidade do código que vai aumentando com o acréscimo de cada possibilidade.
    // Pensar na opção mais econômica.
    return (
        <div>
            <h1 className="text-center mb-5 mt-5">WISHLIST</h1>
            <Products
                wishlist={true}
            />
        </div>
    )
}

export default Wishlist