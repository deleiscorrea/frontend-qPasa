import React, { useState } from 'react'
import { authenticatedHeaders } from '../../fetching/fetching.js'

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
                'http://localhost:3000/api/contacts', {
                    headers: authenticatedHeaders,
                    body: JSON.stringify(form_values_object)
                }
            )
            console.log({response})   
        }
        catch (error) {

        }
    }
    const handleChangeFile = (e) => {
        const file_found = e.target.files[0]
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
            <form onSubmit={handleSubmitNewContact}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input name="name" type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="info">Información</label>
                    <input name="info" type="text" id="info" />
                </div>
                <div>
                    {
                        image && <img src={image} alt="" />
                    }
                    <label htmlFor="igame">Foto</label>
                    <input name="image"type="file" id="image" onChange={handleChangeFile} accept='image/*'/>
                </div>
                <button type='submit'>Crear contacto</button>
            </form>
        </div>
    )
}

export default CreateContact