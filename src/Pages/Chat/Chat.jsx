import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { mensajes } from '../../mensajes/mensajes'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Chat = () => {
    const { contacto_id } = useParams()
    const [mensaje, setMensaje] = useState('')

    const contacto = mensajes.find((mensaje) => mensaje.id === Number(contacto_id))
    
    const handleEnviarMensaje = () => {
        if (mensaje.trim() === '') return

        const nuevoMensaje = {
            autor: "yo",
            texto: mensaje.toLowerCase(),
            hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            estado: "no visto"
        }

        contacto.contenido.push(nuevoMensaje)

        setMensaje('')
    }

    return (
        <>
            <div className='contacto'>
                <Link to={'/'}>
                    <button className='btnFoto'>
                        <img className='fotoContacto' src={contacto.foto} alt={contacto.foto} />
                    </button>
                </Link>
                <Link to={'/info/' + contacto.id } className='infoContacto'>
                    <h2>{contacto.contacto}</h2>
                </Link>
                <div className='funciones'>
                    <button className='btnLlamada'><i className="bi bi-telephone"></i></button>
                    <button className='btnConfig'><i className="bi bi-three-dots"></i></button>
                </div>
            </div>
            <div className='mensajes'>
                {contacto.contenido.map((msg, index) => (
                    <div key={index} className={msg.autor === "yo" ? "mensajeYo" : "mensajeOtro"}>
                        <p>{msg.texto}</p>
                        <div className='horaEstado'>
                            <span style={{color:"rgb(60, 60, 60)"}}><b>{msg.hora}</b></span>
                            <span>
                                {msg.autor == "otro"
                                    ? null
                                    : msg.estado == "visto"
                                        ? <i className="bi bi-eye-fill"></i>
                                        : <i className="bi bi-eye-slash-fill"></i>}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='campoMensaje'>
                <textarea className='texto' value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribí acá..."/>
                <button className='btnEnviar' onClick={handleEnviarMensaje}>
                    <img className='enviar' src="/imagenes/enviar.png" alt="enviar"/>
                </button>
            </div>
        </>
    )
}

export default Chat