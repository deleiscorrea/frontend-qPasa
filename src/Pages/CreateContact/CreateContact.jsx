import React, { useEffect, useState } from 'react'
import { getAuthenticatedHeaders, POST } from '../../fetching/fetching.js'
import { extractFormData } from '../../utils/extractFormData.js'
import { Link } from 'react-router-dom'
import ENVIROMENT from '../../enviroment.js'

const CreateContact = () => {
    const [image, setImage] = useState("")
    const handleSubmitNewContact = async (e) => {
        try {
            e.preventDefault()
            const form_HTML = e.target
            const form_values = new FormData(form_HTML)
            const form_fields = {
                name: "",
                email: "",
                info: ""
            }
            const form_values_object = extractFormData(form_fields, form_values)
            form_values_object.image = image
            const response = await POST(
                `${ENVIROMENT.URL_BACKEND}/api/contacts`, {
                    headers: getAuthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
                }
            )
            console.log({response})   
        }
        catch (error) {
            console.error(error)
        }
    }
    const handleChangeFile = (e) => {
        const file_found = e.target.files[0]
        if(file_found && file_found.size > 2 * 1024 * 1024){
            alert("El archivo es demasiado grande")
            return
        }
        
        const lector = new FileReader()
        lector.onloadend = () => {
            console.log("carga finizada")
            console.log(lector.result)
            setImage(lector.result)
        }
        if(file_found){
            lector.readAsDataURL(file_found)
        }
    }
    return (
        <div>
            <div className='qPasaCreate'>
                <h2 className='quePasa'>qPasa!</h2>
            </div>
            <div className='fondoCreate'>
                <h1 className='tituloCreate'>Crear contacto</h1>
                <div className='formularioCreate'>
                    <form className='formCreate' onSubmit={handleSubmitNewContact}>
                        <div>
                            <label htmlFor="name"></label>
                            <input name="name" type="text" id="name" placeholder='Nombre'/>
                        </div>
                        <div>
                            <label htmlFor="email"></label>
                            <input name="email" type="email" id="email" placeholder='Email'/>
                        </div>
                        <div>
                            <label htmlFor="info"></label>
                            <input name="info" type="text" id="info" placeholder='Información'/>
                        </div>
                        <div>
                            <label htmlFor="image"></label>
                            <input name="image"type="file" id="image" onChange={handleChangeFile} accept='image/*'/>
                        </div>
                        <button type='submit' className='botonCreate'>Crear contacto</button>
                    </form>
                </div>
                <div className='spanCreate'>
                    <Link to={'/contacts'} className='contactos'>Contactos</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateContact