import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData.js'
import ENVIROMENT from '../../enviroment.js'

const ResetPassword = () => {
    const {reset_token} = useParams()
    const handleSubmitResetForm = (e) => {
        e.preventDefault()
        const form_HTML = e.target
        const form_values = new FormData(form_HTML)
        const form_fields = {
            password: "",
        }
        const form_values_object = extractFormData(form_fields, form_values)
        fetch(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/` + reset_token, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '023be404-c59a-4f97-bce4-941acd7331c5'
            },
            body: JSON.stringify(form_values_object)
        })
            .then(
                (responseHTTP) => {
                    console.log({ responseHTTP })
                    return responseHTTP.json()
                }
            )
            .then(
                (body) => {
                    console.log({ body })
                }
            )
            .catch(
                (error) => { console.error(error) }
            )
    }
    return (
        <div>
            <h1>Restablecé tu contraseña</h1>
            <form onSubmit={handleSubmitResetForm}>
                <div>
                    <label htmlFor='password'>NUEVA CONTRASEÑA</label><br />
                    <input name='password' type='password' id='password' placeholder='pepito-juan_123' />
                </div>
                <button type='submit'>Restablecer contraseña</button>
            </form>
            <span>Volver a <Link to='/login'>iniciar sesión</Link></span>
        </div>
    )
}

export default ResetPassword