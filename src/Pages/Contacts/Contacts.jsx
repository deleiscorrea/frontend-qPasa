import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useContacts from '../../Hooks/useContacts'

const Contacts = () => {
    const {contacts, isLoadingContacts} = useContacts()
    console.log(contacts)
    return (
        <div>
            <h1>Contactos</h1>
            <Link to='/contacts/new'><button>Nuevo contacto</button></Link>
            {
                isLoadingContacts
                ? <span>Cargando...</span>
                : <ContactsList contacts={contacts}/>
            }
        </div>
    )
}

const ContactsList = ({contacts}) => {
    return(
        contacts.map(contact => {
            return <Contact
            key={contact._id}
            {...contact}
            />
        })
    )
}

const Contact = ({name, email, info, image, _id}) => {
    return(
        <div>
            <h2 style={{display: "inline"}}>{name}</h2>
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
        </div>
    )
}

export default Contacts