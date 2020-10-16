import React from 'react'

import classes from './ColorSelect.module.css'

const ColorSelect = props => {
    
    //Removi a borda do bootstrap e passei pro css para que seja possível alterá-la durante o hover. Verificar como fazer o mesmo no caso do 'focus'. Além disso transformar esse trecho em algo dinâmico que será lido provavelmente de um objeto. E também falta inserir a propriedade 'hover' nos spans, para que as cores sejam mais claras quando não estiverem selecionados. Não coloquei aqui, pois já que a lista de opções ainda não está dinâmica eu teria que criar uma classe para cada span. 

    // A ideia inicial é criar uma state para armazenar o nome da cor ou o índice, provavelmente o nome da cor, já que podem haver mais de uma imagem que se referem à mesma cor.
    // Uma função será criada e chamada ao se clicar no círculo de seleção de cores e tal função atualizará a state.
    // O valor da state será enviado através de uma função callback para o componente pai e lá eu precisarei identificar o índice da imagem referente a tal cor e atualizar a state que armazena tal índice, mudando assim o slide que será apresentado como principal.
    // No caso do filtro o comportamente tem que ser um pouco diferente, já que não se trata de um slide, mas sim de um catálogo. 
    // Talvez eu possa utilizar um sistema semelhante ao de tags para realizar uma varredura no array principal e identificar se há termos coincidentes.
    // Lembrando que além da seleção de cores ser utilizada para a UI, os valores também serão inseridos no objeto que sejá enviado para o DB ao inserir o item no carrinho e ao comprá-lo, apesar de eu ainda não ter certeza de que esta última parte de fato existirá.
    // OBS.: Decidi enviar o índice e o nome da cor, o índice é utilizado para alterar o slide mostrado e o nome da cor para inserir a informação no objeto que será armazenado no DB. Acredito que isso também deixará o componente mais dinâmico ajudará no momento de implementá-lo no filtro.
    // OBS.: Não vejo necessidade de uma state aqui, mas a manterei por ora.

    let opacityArr = Array(props.colors.length).fill('0.4')
    // opacityArr[0] = '1.0' // => Ativando esta linha a primeira cor é inicialmente selecionada

    let borderArr = Array(props.colors.length).fill('1px solid black')
    // borderArr[0] = '2px solid black' // => Ativando esta linha a primeira cor é inicialmente selecionada

    let [colorState, setColorState] = React.useState('')
    let [opacity, setOpacity] = React.useState(opacityArr)
    let [border, setBorder] = React.useState(borderArr)

    const selectColorHandler = (color, i) => {
        let newBorder = [...border]
        let newOpacity = [...opacity]
        
        newBorder.map((color, k) => {
            k === i ? newBorder[k] = '2px solid black' : newBorder[k] = '1px solid black' 
        })

        newOpacity.map((color, k) => {
            k === i ? newOpacity[k] = '1.0' : newOpacity[k] = '0.4' 
        })

        setBorder(newBorder)
        setOpacity(newOpacity)
        setColorState(color)
        
        props.selectColorHandlerCallback(color, i)
    }
 

                                
    return (
        <div className="d-flex justify-content-between">
            {
                props.colors.map((color, i) => {
                    return <div key={i} 
                                // className="
                                //     product-details-color 
                                //     mt-2 
                                //     rounded-circle 
                                //     d-flex 
                                //     justify-content-center 
                                //     align-items-center
                                // " 
                                className={`mt-2 rounded-circle ${classes.Product_details_color}`}
                                style={{border: border[i]}}

                                onClick={() => selectColorHandler(color, i)}
                            >
                                <span 
                                    className="rounded-circle" 
                                    style={{backgroundColor: color, opacity: opacity[i]}}
                                >
                                </span>
                            </div>
                })
            }
        </div>
    )
}

export default ColorSelect