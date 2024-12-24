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
      <h1 style={{display: "inline"}}>{name}</h1>
            <span>{` (${_id})`}</span>
            <br />
            <img
                src={image}
                alt={name}
                width={'300'}
                height={'300'}
            />
            <h2>{email}</h2>
            <span>{info}</span>
    </div>
  )
}

export default DetailContact