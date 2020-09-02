import React from 'react'

const ColorSelect = props => {
    
    //Removi a borda do bootstrap e passei pro css para que seja possível alterá-la durante o hover. Verificar como fazer o mesmo no caso do 'focus'. Além disso transformar esse trecho em algo dinâmico que será lido provavelmente de um objeto. E também falta inserir a propriedade 'hover' nos spans, para que as cores sejam mais claras quando não estiverem selecionados. Não coloquei aqui, pois já que a lista de opções ainda não está dinâmica eu teria que criar uma classe para cada span. 
                                
    return (
        <div className="d-flex justify-content-between">
            {
                props.colors.map((color, i) => {
                    return <div key={i} className="
                                    product-details-color 
                                    mt-2 
                                    rounded-circle 
                                    d-flex 
                                    justify-content-center 
                                    align-items-center
                                "
                            >
                                <span className="rounded-circle" style={{backgroundColor: color}}></span>
                            </div>
                })
            }
        </div>
    )
}

export default ColorSelect