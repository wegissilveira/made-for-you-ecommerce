import React from 'react'

import classes from './ProgressBar.module.css'


const ProgressBar = props => {
    
    let [sqSize, ] = React.useState(props.diameter ? props.diameter : 30)
    let [percentage, setPercentage] = React.useState(0)
    let [strokeWidth, ] = React.useState(3)

    let [barIndex, setBarIndex] = React.useState(0) // => Define o ponto que recebe a barra baseado em seu index

    let bars = Array(props.bars).fill(1) // => Quantidade de barras que serão criadas

    let timer = props.timer // => Intervalo que se levará para que a barra seja completada e para que ela vá para o ponto seguinte


    let interval
    React.useEffect(() => {
        let mounted = true
        if (props.auto) { 

            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval = setTimeout(() => {

                if (mounted) {
                    percentage < 100 ? setPercentage(percentage + 1) : setPercentage(0)
                }

                if (percentage === 100) {
                    barIndex < bars.length - 1 ? setBarIndex(barIndex + 1) : setBarIndex(0)
                    props.changeDot('next')
                }
                
            }, timer / 100);
            
        } else {
            setPercentage(100)
        }
        return () => mounted = false;
    })

    const changeSlideHandler = index => {

        setPercentage(0) // Reseta a posição da barra
        setBarIndex(index) // Coloca a barra no ponto clicado

        props.changeDot(index) // Passa o slide do componente parent para acompanhar o ponto que recebe a barra

        clearTimeout(interval) // Limpa o tempo de 'seTimeout' para que este 0 juntamente com 'percentage'
    }

    
    const radius = (sqSize - strokeWidth) / 2
    const viewBox = `0 0 ${sqSize} ${sqSize}`
    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - dashArray * percentage / 100

    let direction = props.direction === 'column' ? 'column' : 'row'
    const barStyle = {
        flexDirection: direction,
        height: props.height + 'px'
    }
    

    
    return (
        <div 
            className={classes.ProgressBar_container} 
            style={barStyle}
        >
            { bars.map((bar, i) => {
                return <svg
                            key={i}
                            width={sqSize}
                            height={sqSize}
                            viewBox={viewBox}
                            style={{cursor: props.clickable === false ? 'default' : 'pointer'}}
                            onClick={props.clickable === false ? null : () => changeSlideHandler(i)}
                        >
                            { i === barIndex ?  
                                <circle
                                    className={classes.Circle_progress}
                                    cx={sqSize / 2}
                                    cy={sqSize / 2}
                                    r={radius}
                                    strokeWidth={`${strokeWidth}px`}
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