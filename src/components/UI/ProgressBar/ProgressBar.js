import React, { Fragment } from 'react'

import './ProgressBar.css'


const ProgressBar = props => {
    
    let [sqSize, setSqSize] = React.useState(30)
    let [percentage, setPercentage] = React.useState(0)
    let [strokeWidth, setStrokeWidth] = React.useState(3)

    let [propsTeste, setPropsTeste] = React.useState(false)
    let [barIndex, setBarIndex] = React.useState(0)

    let [z, setZ] = React.useState(1)

    let bars = Array(props.bar).fill(1)

    let timer = 10000

    const timeHandler = () => {
        setPercentage(percentage + 1)
    }
    //OS: PRECISO CORRIGIR O DESENCONTRO ENTRE O FECHAMENTO DO CÍRCULO E O TEMPO. APARENTEMENTE SE LEVA MAIS TEMPO PARA FECHAR O CÍRCULO DO QUE O TEMPO ESTIPULADO. ENTENDER O PORQUÊ DISSO E SINCRONIZAR. 
    //NA REALIDADE ACHO QUE NÃO SEJA ESSE O PROBLEMA, MAS SIM QUE O CÍRCULO AO SE COMPLETAR PASSA COMO ESTÁ PARA O PONTO SEGUINTE E DEPOIS ZERA, OU SEJA, QUANDO ELE COMPLETA 100% ELE PASSA PRO PRÓXIMO PONTO, NO ENTANTO NO PONTO, IMPRIME OS 100%, ZERA E COMEÇA NOVAMENTE, ISSO CONSOME UM SEGUNDO QUE DEVERIA TER SIDO DO PONTO ANTERIOR, A CADA VOLTA OS SEGUNDOS VÃO SE ACUMULANDO ATÉ O PONTO EM QUE A FALTA DE SINCRONISMO FICA ESCANCARADA.
    //O QUE PRECISO FAZER É QUE QUANDO ELE COMPLETAR 100% O CÍRCULO PASSE PARA O PRÓXIMO PONTO E ZERE IMEDIATAMENTE, SEM PERDER O SEGUNDO QUE DEVERIA SER DO PONTO ANTERIOR.
    const teste = () => {
        setPropsTeste(!propsTeste)
        // setPercentage(percentage + 1)
    }
    // let z = 1
    if (propsTeste) {
        setTimeout(() => {
            percentage < 99 ? setPercentage(percentage + 1) : setPercentage(0)
            // setPercentage(percentage + 1)
        }, timer / 100);

        setTimeout(() => {
            console.log(percentage)
            barIndex < bars.length - 1 ? setBarIndex(barIndex + 1) : setBarIndex(0)
            // setPercentage(0)
        }, timer);
        
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

                            onClick={() => teste()}
                        >
                            { i === barIndex ?  <Fragment><circle
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
                                <text
                                    className="circle-text"
                                    x="50%"
                                    y="50%"
                                    dy=".3em"
                                    textAnchor="middle">
                                    {`${percentage}%`}
                                </text></Fragment>
                            : null }
                            {/* <circle
                                className="circle-center"
                                cx="50%"
                                cy="50%"
                                r="3"
                            />  */}
                            
                        </svg>
            }) }
        </Fragment>
    );
}

export default ProgressBar