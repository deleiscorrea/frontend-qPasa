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
    <div className='detalle'>
      <h1 className='nombreDetalle' style={{display: "inline"}}>{name}</h1>
      <span className='infoDetalle'>{info}</span>
      <br />
      <img
          src={image}
          alt={name}
          width={'300'}
          height={'300'}
      />
      <h2 className='emailDetalle'>{email}</h2>
    </div>
  )
}

export default DetailContact