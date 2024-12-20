import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/fetching"
import { useNavigate } from "react-router-dom"
import ENVIROMENT from "../enviroment"

const useContactDetail = (contact_id) => {
    const [contactDetail, setContactDetail] = useState(null)
    const [isLoadingContactDetail, setIsLoadingContactDetail] = useState(true)
    const [errorContactDetail, setErrorContactDetail] = useState(null)
    const navigate = useNavigate()
    
    const getContactDetail = async (contact_id) => {
        const contact_detail_response = await GET(
            `${ENVIROMENT.URL_BACKEND}/api/contacts/` + contact_id, {
                headers: getAuthenticatedHeaders()
            }
        )

        setIsLoadingContactDetail(false)
        if(contact_detail_response.ok) {
            setContactDetail(contact_detail_response.payload.contact)
        }
        else{
            navigate('/contacts')
            setErrorContactDetail(contact_detail_response.payload.detail)
        }
    }

    useEffect(
        () => {
            getContactDetail(contact_id)
        },
        []
    )
    return { contactDetail, isLoadingContactDetail, errorContactDetail }
}

export default useContactDetail