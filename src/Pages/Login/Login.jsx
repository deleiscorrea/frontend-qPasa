import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { authenticatedHeaders, POST } from '../../fetching/fetching'

const Login = () => {
  const navigate = useNavigate()
  const handleSubmitLoginForm = async (e) => {
    try{
      e.preventDefault()
      const form_HTML = e.target
      const form_values = new FormData(form_HTML)
      const form_fields = {
        email: "",
        password: ""
      }
      const form_values_object = extractFormData(form_fields, form_values)
      const response = await POST(
        'http://localhost:3000/api/auth/login', {
            headers: authenticatedHeaders,
            body: JSON.stringify(form_values_object)
        }
      )
    console.log({response})
      const access_token = response.payload.token
      sessionStorage.setItem('access_token', access_token)
      sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
      navigate('/home')
    }
    catch(error){
      console.error(error)
    }
  }
  return (
    <div>
      <h1>Iniciá sesión</h1>
      <form onSubmit={handleSubmitLoginForm}>
        <div>
          <label htmlFor='email'>CORREO ELECTRÓNICO</label><br />
          <input name='email' type='email' id='email' placeholder='juanperon@gmail.com' />
        </div>
        <div>
          <label htmlFor='password'>CONTRASEÑA</label><br />
          <input name='password' type='password' id='password' placeholder='Juan-Peron_123' />
        </div>
        <button type='submit'>Iniciar sesión</button>
      </form>
      <span>¿Te olvidaste la contraseña? <Link to='/forgot-password'>Restablecer</Link></span><br />
      <span>Si no tenés una cuenta, <Link to='/register'>registrate</Link></span>
    </div>
  )
}

export default Login