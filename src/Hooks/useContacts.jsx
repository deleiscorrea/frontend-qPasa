import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/fetching.js"
import ENVIROMENT from "../enviroment.js"

const useContacts = () => {
    const [contacts, setContacts] = useState([])
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)

    const getContacts = async () => {
        setIsLoadingContacts(true); // Mostrar indicador de carga durante la actualización
        try {
            const response = await GET(
                `${ENVIROMENT.URL_BACKEND}/api/contacts`, 
                {
                    headers: getAuthenticatedHeaders(),
                }
            )
            console.log({ response });
            if (response.ok) {
                setContacts(response.payload.contacts || []);
            } else {
                console.error("Error al obtener contactos:", response.payload.detail);
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error.message);
        } finally {
            setIsLoadingContacts(false); // Detener indicador de carga
        }
    }

    useEffect(
        () => {
            getContacts()
        },
        []
    )

    return {contacts, isLoadingContacts}
}

export default useContacts