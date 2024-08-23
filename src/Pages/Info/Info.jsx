import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { mensajes } from '../../mensajes/mensajes'

const Info = () => {
    const { contacto_id } = useParams()
    const contacto = mensajes.find((mensaje) => mensaje.id === Number(contacto_id))
    const navigate = useNavigate()

    const handleVolver = () => {
        navigate(-1)

    }
    return (
        <div className='informacion'>
                <div className='volver'>
                    <button onClick={handleVolver} className='atras'><i className="bi bi-caret-left-fill"></i></button>
                    <h1>{contacto.contacto}</h1>
                </div>
                <div className='fotoConfig'>
                    <div className='infoAjustes'>
                        <button className='silenciar'><i className="bi bi-bell-slash"></i></button>
                        <button className='llamada'><i className="bi bi-telephone"></i></button>
                        <button className='configuracion'><i className="bi bi-three-dots"></i></button>
                    </div>
                    <img src={contacto.foto} alt={contacto.contacto} className='infoFoto'/>
                </div>
                <div className='estado'>
                    <span>{contacto.estado}</span>
                </div>
        </div>
    )
}

export default Info