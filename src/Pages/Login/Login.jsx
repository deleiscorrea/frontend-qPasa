import React from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'

const Login = () => {
  const handleSubmitLoginForm = (e) => {
    e.preventDefault()
    const form_HTML = e.target
    const form_values = new FormData(form_HTML)
    const form_fields = {
      email: "",
      password: ""
    }
    const form_values_object = extractFormData(form_fields, form_values)
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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