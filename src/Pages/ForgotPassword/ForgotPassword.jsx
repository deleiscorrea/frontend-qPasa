import React from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { getAuthenticatedHeaders, POST } from '../../fetching/fetching'
import ENVIROMENT from '../../enviroment'

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
            `${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            }
        )
        console.log({response})
    }
    return (
        <div>
            <div className='qPasaForgot'>
                <h2 className='quePasa'>qPasa!</h2>
            </div>
            <div className='fondoForgot'>
                <h1 className='tituloForgot'>Restablecé tu <br />contraseña</h1>
                <div className='formularioForgot'>
                    <form className='formForgot' onSubmit={handleSubmitLoginForm}>
                        <div>
                            <label htmlFor='email' className='emailForgot'>Email</label><br />
                            <input name='email' type='email' id='email' placeholder='juanperon@gmail.com' />
                        </div>
                        <div className='parrafoForgot'>
                            <p>Se te enviará un correo electrónico con un enlace para restablecer tu contraseña</p> 
                        </div>
                        <button type='submit' className='botonForgot'>Enviar</button>
                    </form>
                </div>
                <div className='spanForgot'>
                    <span>Si ya tenés una cuenta, <Link to='/login'>iniciá sesión</Link></span><br />
                    <span>Si no tenés una cuenta, <Link to='/register'>registrate</Link></span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword