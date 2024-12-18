import React from 'react'
import { useParams } from 'react-router-dom'
import useContactDetail from '../../Hooks/useContactDetail'

const DetailContact = () => {
    const { contacto_id } = useParams()
    const {contactDetail, isLoadingContactDetail, errorContactDetail} = useContactDetail(contacto_id)
  return (
    <div>
      <h2>DetailContact</h2>
      {
        isLoadingContactDetail
        ? <span>Cargando...</span>
        : (
          errorContactDetail
          ? <span>{errorContactDetail}</span>
          : <ContactDetail {...contactDetail}/>
        )
      }
    </div>
  )
}

const ContactDetail = ({name, email, info, image, _id}) => {
  return (
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
    </div>
  )
}

export default DetailContact