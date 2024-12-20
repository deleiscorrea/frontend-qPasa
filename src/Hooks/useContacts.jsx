import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/fetching.js"
import ENVIROMENT from "../enviroment.js"

const useContacts = () => {
    const [contacts, setContacts] = useState([])
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)

    const getContacts = async () => {
        const response = await GET(
            `${ENVIROMENT.URL_BACKEND}/api/contacts`, {
            headers: getAuthenticatedHeaders(),
            }
        )
        console.log({ response })
        if(response.ok){
            setContacts(response.payload.contacts)
            setIsLoadingContacts(false)
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