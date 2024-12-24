import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useContacts from '../../Hooks/useContacts'
import { DELETE, getAuthenticatedHeaders } from "../../fetching/fetching.js"
import ENVIROMENT from "../../enviroment.js"

const Contacts = () => {
    const { contacts, isLoadingContacts, getContacts } = useContacts()

    const handleDeleteContact = async (contactId) => {
        try {
            const response = await DELETE(
                `${ENVIROMENT.URL_BACKEND}/api/contacts/${contactId}`,
                {
                    headers: getAuthenticatedHeaders(),
                }
            )
    
            if (response && response.ok) {
                console.log("Contacto eliminado exitosamente");
                await getContacts(); // Recargar contactos después de eliminar
            } else {
                console.error("Error al eliminar el contacto:", response?.payload?.detail || "Error desconocido");
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error.message);
        }
    }

    return (
        <div>
            <div className='qPasaContactos'>
                <h2 className='quePasaContactos'>qPasa!</h2>
            </div>
            <div className='nuevosContactos'>
                <h1 className='contactostitulo'>Contactos</h1>
                <Link to='/contacts/new'><button className='botonNuevoContacto'>Nuevo contacto</button></Link>
                {
                    isLoadingContacts
                        ? <span>Cargando...</span>
                        : <ContactsList contacts={contacts} onDeleteContact={handleDeleteContact} />
                }
            </div>
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
            <div className=''>
                <h1 className='' style={{ display: "inline" }}>{name}</h1>
                <span className=''>{` (${_id})`}</span>
                <br />
                <img className=''
                    src={image}
                    alt={name}
                    width={'100'}
                    height={'100'}
                />
                <Link to={'/contacts/' + _id}>Ir a detalle</Link>
                <br />
                <button className='' onClick={() => onDeleteContact(_id)}>Eliminar</button>
                <br />
            </div>
        </div>
    )
}

export default Contacts