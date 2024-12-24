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
            <div style={{ backgroundColor: "#F9E400", display: "flex", alignItems: "center", height: "50px", paddingLeft: "10px" }}>
                <h2 style={{color: "#F5004F", position: "fixed", zIndex: "2"}}>qPasa!</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
                <h1 style={{color: "white", fontSize: "40px", marginBottom: "20px", marginTop: "20px"}}>Contactos</h1>
                <Link style={{textDecoration: "none"}} to='/contacts/new'><button style={{backgroundColor: "#F9E400", width: "100%", padding: "10px 0px 10px 0px", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none"}}>Nuevo contacto</button></Link>
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ display: "inline", color: "white", marginRight: "10px", marginBottom: "10px"}}>{name}</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img className=''
                        src={image}
                        alt={name}
                        width={'100'}
                        height={'100'}
                    />
                    <span style={{ color: "gainsboro", marginBottom: "10px"}}>{` (${_id})`}</span>
                    <Link style={{ textDecoration: "none", color: "#F5004F"}}to={'/contacts/' + _id}>Ir a detalle</Link>
                    <br />
                    <button style={{ backgroundColor: "red", width: "60%", padding: "10px 0px 10px 0px"}}onClick={() => onDeleteContact(_id)}>Eliminar</button>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Contacts