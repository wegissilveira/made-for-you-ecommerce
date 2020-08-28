import React, { Fragment } from 'react'

import './ProgressBar.css'


const ProgressBar = props => {
    
    let [sqSize, setSqSize] = React.useState(30)
    let [percentage, setPercentage] = React.useState(0)
    let [strokeWidth, setStrokeWidth] = React.useState(3)

    let [barIndex, setBarIndex] = React.useState(0) // => Define o ponto que recebe a barra baseado em seu index

    let bars = Array(props.bars).fill(1) // => Quantidade de barras que serão criadas

    let timer = props.timer // => Intervalo que se levará para que a barra seja completada e para que ela vá para o ponto seguinte


    // Controla a velocidade de rotação da barra e muda a parra de ponto, além de passar o slide do componente parent com a função callback
    let interval
    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        interval = setTimeout(() => {
            percentage < 100 ? setPercentage(percentage + 1) : setPercentage(0)
            if (percentage === 100) {
                barIndex < bars.length - 1 ? setBarIndex(barIndex + 1) : setBarIndex(0)
                props.change('next')
            }

        }, timer / 100);
    })
    
    // Passa o slide manualmente
    const changeSlideHandler = arg => {

        setPercentage(0) // Reseta a posição da barra
        setBarIndex(arg) // Coloca a barra no ponto clicado

        props.change(arg) // Passa o slide do componente parent para acompanhar o ponto que recebe a barra

        clearTimeout(interval) // Limpa o tempo de 'seTimeout' para que este 0 juntamente com 'percentage'
    }


    // Size of the enclosing square
    // const sqSize = sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;
    // console.log(dashOffset)
    
    return (
        <Fragment>
            { bars.map((bar, i) => {
                return <svg
                            key={i}

                            width={sqSize}
                            height={sqSize}
                            viewBox={viewBox}

                            style={{cursor: 'pointer'}}

                            onClick={() => changeSlideHandler(i)}
                        >
                            { i === barIndex ?  
                                <circle
                                    className="circle-progress"
                                    cx={sqSize / 2}
                                    cy={sqSize / 2}
                                    r={radius}
                                    strokeWidth={`${strokeWidth}px`}
                                    // Start progress marker at 12 O'Clock
                                    transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                                    style={{
                                        strokeDasharray: dashArray,
                                        strokeDashoffset: dashOffset
                                    }} 
                                /> 
                            : null }
                            <circle
                                className="circle-center"
                                cx="50%"
                                cy="50%"
                                r="3"
                            /> 
                            
                        </svg>
            }) }
        </Fragment>
    );
}

export default ProgressBar