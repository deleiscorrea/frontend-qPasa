import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useContacts from '../../Hooks/useContacts'
import { DELETE, getAuthenticatedHeaders } from "../../fetching/fetching.js"
import ENVIROMENT from "../../enviroment.js"

const Contacts = () => {
    const { contacts, isLoadingContacts, getContacts } = useContacts()

    const handleDeleteContact = async (contactId) => {
        const response = await DELETE(
            `${ENVIROMENT.URL_BACKEND}/api/contacts/${contactId}`,
            {
                headers: getAuthenticatedHeaders(),
            }
        )
        if (response.ok) {
            // Si el contacto se elimina con éxito, actualiza la lista
            getContacts()
        } else {
            console.error("Error al eliminar el contacto:", response.payload.detail)
        }
    }

    return (
        <div>
            <h1>Contactos</h1>
            <Link to='/contacts/new'><button>Nuevo contacto</button></Link>
            {
                isLoadingContacts
                    ? <span>Cargando...</span>
                    : <ContactsList contacts={contacts} onDeleteContact={handleDeleteContact} />
            }
        </div>
    )
}

const ContactsList = ({ contacts, onDeleteContact }) => {
    return (
        contacts.map(contact => {
            return <Contact
                key={contact._id}
                {...contact}
                onDeleteContact={onDeleteContact}
            />
        })
    )
}

const Contact = ({ name, email, info, image, _id, onDeleteContact }) => {
    return (
        <div>
            <h2 style={{ display: "inline" }}>{name}</h2>
            <span>{` (${_id})`}</span>
            <br />
            <img
                src={image}
                alt={name}
                width={'200'}
            />
            <h3>{email}</h3>
            <h4>{info}</h4>
            <Link to={'/contacts/' + _id}>Ir a detalle</Link>
            <br />
            <button onClick={() => onDeleteContact(_id)}>Eliminar</button>
            <br />
        </div>
    )
}

export default Contacts