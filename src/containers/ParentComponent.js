import React from 'react'

import ChildComponent from './ChildComponent'

const ParentComponent = props => {

    const array = [0,1,2,3,4]

    const callbackFunction = index => console.log(index)

    return (
        <React.Fragment>
            {
                array.map((item, i) => {
                    return <ChildComponent 
                                index={i} 
                                fn={callbackFunction}
                            />
                })
            }
        </React.Fragment>
    )
}

export default ParentComponent