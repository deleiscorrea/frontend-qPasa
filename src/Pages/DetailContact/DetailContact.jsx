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
    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
      <h1 style={{fontSize: "50px", textAlign: "center"}}>{name}</h1>
      <span style={{fontSize: "15px", textAlign: "center"}}>{info}</span>
      <br />
      <img
          src={image}
          alt={name}
          width={'300'}
          height={'300'}
      />
      <h2 style={{fontSize: "30px", textAlign: "center"}}>{email}</h2>
    </div>
  )
}

export default DetailContact