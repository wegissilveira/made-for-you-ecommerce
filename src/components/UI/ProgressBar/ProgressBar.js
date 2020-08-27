import React, { Fragment } from 'react'

import './ProgressBar.css'


const ProgressBar = props => {
    
    let [sqSize, setSqSize] = React.useState(30)
    let [percentage, setPercentage] = React.useState(0)
    let [strokeWidth, setStrokeWidth] = React.useState(3)

    let [trigger, setTrigger] = React.useState(false)
    let [barIndex, setBarIndex] = React.useState(0)

    let bars = Array(props.bar).fill(1)

    let timer = props.timer


    const barTriggerHandler = () => {
        setTrigger(!trigger)
    }

    // if (trigger) {
    React.useEffect(() => {
        const interval = setTimeout(() => {
            percentage < 99 ? setPercentage(percentage + 1) : setPercentage(0)

            if (percentage === 99) {
                    console.log(percentage)
                    barIndex < bars.length - 1 ? setBarIndex(barIndex + 1) : setBarIndex(0)
            }

        }, timer / 100);
        return () => clearTimeout(interval);
    })
                
    // }


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

                            onClick={() => barTriggerHandler()}
                        >
                            { i === barIndex ?  
                                <Fragment>
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
                                    {/* <text
                                        className="circle-text"
                                        x="50%"
                                        y="50%"
                                        dy=".3em"
                                        textAnchor="middle">
                                        {`${percentage}%`}
                                    </text> */}
                                </Fragment>
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