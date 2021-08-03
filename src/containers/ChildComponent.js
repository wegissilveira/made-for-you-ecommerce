import React from 'react'



const ChildComponent = props => {

    const fnCallback = index => {
        props.fn(index)
        // console.log(index)
    }

    return (
        <div>
            <button onClick={() => props.fn()} >Send Index Back: {props.index}</button>
        </div>
    )
}

export default ChildComponent