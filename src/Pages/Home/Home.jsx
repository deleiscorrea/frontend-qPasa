import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mensajes } from '../../mensajes/mensajes'

const Home = () => {
    const [abierto, setAbierto] = useState(false)
    const [tema, setTema] = useState(false)
    const [ajustes, setAjustes] = useState(false)
    const [buscar, setBuscar] = useState(false)
    const [opaco, setOpaco] = useState(false)
    const [busqueda, setBusqueda] = useState("")
    const [anchoVentana, setAnchoVentana] = useState(window.innerWidth)
    

    const alternarMenu = () => {
        setAbierto(!abierto)
    }
    
    const alternarTema = () => {
        setTema(!tema)
    }

    const alternarAjustes = () => {
        setLetra(!ajustes)
    }

    const alternarBuscar = () => {
        if (anchoVentana >= 1600) {
            setBuscar(!buscar)
            setOpaco(!opaco)
        }
    }

    const buscarContactos = mensajes.filter((mensaje) =>
        mensaje.contacto.toLowerCase().includes(busqueda.toLowerCase())
    )

    useEffect(() => {
        const handleTamanio = () => setAnchoVentana(window.innerWidth)
        window.addEventListener('resize', handleTamanio)
        return () => window.removeEventListener('resize', handleTamanio)
    }, [])

    return (
        <>
            <div className='nav'>
                <hr className='hrArriba'/>
                <h1 className='titulo'></h1>
                <hr className='hrAbajo'/>
                <button onClick={alternarMenu} className='btnAjustes'>
                    <i className={`bi ${!abierto
                        ? "bi-three-dots-vertical" 
                        : anchoVentana < 1600
                            ? "bi-chevron-compact-right"
                            : "bi-chevron-compact-up"}`}></i>
                </button>
                {abierto && (
                    <div className='ajustes'>
                        <button onClick={alternarTema} className='config'><b>Tema</b></button>
                        <button onClick={alternarAjustes} className='config'><b>Ajustes</b></button>
                        <button className='config'><b>Perfil</b></button>
                    </div>
                )}
            </div>
            {(anchoVentana < 1600 || (anchoVentana >= 1600 && buscar)) && (
                <div>
                    <input onChange={(e) => setBusqueda(e.target.value)} className='buscar' type="text" placeholder='Buscar chat'/>
                </div>
            )}
            {opaco && <div className="overlay" onClick={alternarBuscar}></div>}

            <div className="listaContactos">
                {buscarContactos.map((mensaje) => {
                    const ultimoMensaje = mensaje.contenido[mensaje.contenido.length - 1]
                    return (
                        <div key={mensaje.id} className='cambioColor'>
                            <Link to={'/chat/' + mensaje.id} className='link'>
                                <div className='info'>
                                    <img className='foto' src={mensaje.foto}/>
                                    <div className='autorMensaje'>
                                        <h3 className='autor'>{mensaje.contacto}</h3>
                                        <p className='ultimoMensaje'>
                                        {anchoVentana < 500
                                            ? (ultimoMensaje.texto.length > 25 
                                                ? `${ultimoMensaje.texto.slice(0, 25)}...` 
                                                : ultimoMensaje.texto)
                                            : anchoVentana < 1200
                                                ? (ultimoMensaje.texto.length > 40 
                                                    ? `${ultimoMensaje.texto.slice(0, 40)}...` 
                                                    : ultimoMensaje.texto)
                                                : anchoVentana < 1600
                                                    ? (ultimoMensaje.texto.length > 80
                                                        ? `${ultimoMensaje.texto.slice(0, 80)}...` 
                                                        : ultimoMensaje.texto)
                                                    : anchoVentana > 1600
                                                        ? (ultimoMensaje.texto.length > 58
                                                            ? `${ultimoMensaje.texto.slice(0, 58)}...` 
                                                            : ultimoMensaje.texto)
                                                        : ultimoMensaje.texto
                                        }
                                        </p>
                                    </div>
                                    <p className='hora'><b>{ultimoMensaje.hora}</b></p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            {anchoVentana >= 1600 && (
                <button onClick={alternarBuscar} className='btnBuscar'>
                    <i className="bi bi-search"></i>
                </button>
                )}
            <Link to={'/IA'}>
                <button className='btnIA'>
                    <img src="imagenes/ia.png" alt="ia" className='imgIA'/>
                </button>
            </Link>
        </>
    )
}

export default Home