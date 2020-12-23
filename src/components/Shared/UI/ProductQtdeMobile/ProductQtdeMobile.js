import React from 'react'

const ProductQtdeMobile = props => {

    let [initialValue, setInitialValue] = React.useState(props.initialValue)

    const changeQtde = (e) => {
        const tagName = e.target.tagName
        
        let input_value
        if (tagName === 'INPUT') {
            input_value = Number(e.target.value)
        } else if (tagName === 'DIV') {
            input_value = Number(e.target.children[1].value)
        } else if (tagName === 'LABEL') {
            input_value = Number(e.target.parentNode.children[1].value)
        }

        Array.from(e.currentTarget.children).forEach((item, index) => {
            item.children[1].checked = false

            if (index + 1 === input_value) {
                item.children[1].checked = true
            }
        })

        props.changeQtdeCallBack(input_value)

        props.toggle()

        setInitialValue(false)
    }


    return (
        <div onClick={(e) => changeQtde(e)}>
            <div>
                <label>1</label>
                <input type="radio" value={1} defaultChecked={initialValue} />
            </div>
            <div>
                <label>2</label>
                <input type="radio" value={2} />
            </div>
            <div>
                <label>3</label>
                <input type="radio" value={3} />
            </div>
            <div>
                <label>4</label>
                <input type="radio" value={4} />
            </div>
            <div>
                <label>5</label>
                <input type="radio" value={5} />
            </div>
            <div>
                <label>6</label>
                <input type="radio" value={6} />
            </div>
            <div>
                <label>7</label>
                <input type="radio" value={7} />
            </div>
            <div>
                <label>8</label>
                <input type="radio" value={8} />
            </div>
            <div>
                <label>9</label>
                <input type="radio" value={9} />
            </div>
            <div>
                <label>10</label>
                <input type="radio" value={10} />
            </div>
        </div>
    )
}

export default ProductQtdeMobile