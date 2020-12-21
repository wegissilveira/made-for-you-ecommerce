import React from 'react'

import classes from './ProgressBar.module.css'

// A barra está reaproveitável e personalizável em algumas características, como tempo de execução e quantidade de barras que serão criadas, além de ser possível decidir se a passagem de slides será automática ou manual.
// Seria possível possível configurar outras propriedades como personalizáveis, como cores do ponto e da barra, tamanho, espessura etc. Mas como aqui não será necessário, provavelmente não farei isso, quando eu for utilizar tal componente em outra aplicação eu posso realizar as implementações necessárias.
// Também personalizei a orientação (horizontal/ vertical) dos pontos e a altura, talvez fazer o mesmo para 'width'. Verificar isso no momento em que for colocar horizontal na popup e checar se é necessário.
const ProgressBar = props => {
    
    let [sqSize, ] = React.useState(props.diameter ? props.diameter : 30)
    let [percentage, setPercentage] = React.useState(0)
    let [strokeWidth, ] = React.useState(3)

    let [barIndex, setBarIndex] = React.useState(0) // => Define o ponto que recebe a barra baseado em seu index

    let bars = Array(props.bars).fill(1) // => Quantidade de barras que serão criadas

    let timer = props.timer // => Intervalo que se levará para que a barra seja completada e para que ela vá para o ponto seguinte


    // Controla a velocidade de rotação da barra e muda a parra de ponto, além de passar o slide do componente parent com a função callback
    let interval
    React.useEffect(() => {
        let mounted = true
        if (props.auto) { // => Determina se a passagem de slides e barras será automática

            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval = setTimeout(() => {

                if (mounted) {
                    percentage < 100 ? setPercentage(percentage + 1) : setPercentage(0)
                }

                if (percentage === 100) {
                    barIndex < bars.length - 1 ? setBarIndex(barIndex + 1) : setBarIndex(0)
                    props.change('next')
                }
                
            }, timer / 100);
            
        } else {
            setPercentage(100)
        }
        return () => mounted = false;
    })
    // console.log('teste')
    // Passa o slide manualmente
    const changeSlideHandler = arg => {

        setPercentage(0) // Reseta a posição da barra
        setBarIndex(arg) // Coloca a barra no ponto clicado

        props.change(arg) // Passa o slide do componente parent para acompanhar o ponto que recebe a barra

        clearTimeout(interval) // Limpa o tempo de 'seTimeout' para que este 0 juntamente com 'percentage'
    }

    
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;

    let direction = props.direction === 'column' ? 'flex-column' : 'flex-row'
    const style = `d-flex ${direction} justify-content-between`
    
    return (
        <div 
            className={style} 
            style={{height: props.height + 'px'}}
        >
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
                                    className={classes.Circle_progress}
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
                                className={classes.Circle_center}
                                cx="50%"
                                cy="50%"
                                r="3"
                            /> 
                            
                        </svg>
            }) }
        </div>
    );
}

export default ProgressBar