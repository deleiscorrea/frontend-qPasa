import React from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { getAuthenticatedHeaders, POST } from '../../fetching/fetching'

const ForgotPassword = () => {
    const handleSubmitLoginForm = async (e) => {
        e.preventDefault()
        const form_HTML = e.target
        const form_values = new FormData(form_HTML)
        const form_fields = {
            email: "",
        }
        const form_values_object = extractFormData(form_fields, form_values)
        const response = await POST(
            'http://localhost:3000/api/auth/forgot-password', {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            }
        )
        console.log({response})
    }
    return (
        <div>
            <h1>¿Olvidaste tu contraseña?</h1>
            <p>Se te enviará un correo electrónico con un enlace para restablecer tu contraseña</p>
            <form onSubmit={handleSubmitLoginForm}>
                <div>
                    <label htmlFor='email'>CORREO ELECTRÓNICO</label><br />
                    <input name='email' type='email' id='email' placeholder='juanperon@gmail.com' />
                </div>
                <button type='submit'>Enviar</button>
            </form>
            <span>Si ya tenés una cuenta, <Link to='/login'>iniciá sesión</Link></span><br />
            <span>Si no tenés una cuenta, <Link to='/register'>registrate</Link></span>
        </div>
    )
}

export default ForgotPassword