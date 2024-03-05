import React, { useState } from 'react'

export default function CssTest() {

    const [color, setColor] = useState(false)
    let myStyle = {}

    if (color) {
        myStyle = { color: 'red', textAlign: 'center' }
    }
    else {
        myStyle = { color: '#1976db', textAlign: 'center' }

    }
    return (
        <>
            <h1 style={myStyle}>Lorem ipsum dolor sit amet consectetur.</h1>
            <button className='btn text-center btn-danger' onClick={() => setColor(!color)}>Change</button>
        </>
    )
}
