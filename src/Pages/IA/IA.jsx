import React from 'react'
import { Link } from 'react-router-dom'

const IA = () => {
    return (
        <div className='fondoIA'>
            <div className='ia'>
                        <Link to={'/'}>
                            <button className='btnIa'>
                                <img className="imgIa" src="./imagenes/ia.png" alt="ia"/>
                            </button>
                        </Link>
                <h2>INTELIGENCIA ARTIFICIAL</h2>
            </div>
        </div>
    )
}

export default IA