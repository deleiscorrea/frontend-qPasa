import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData'
import { getAuthenticatedHeaders, POST } from '../../fetching/fetching.js'
import ENVIROMENT from '../../enviroment.js'

const Login = () => {
  const navigate = useNavigate()
  const handleSubmitLoginForm = async (e) => {
    try {
      e.preventDefault()
      const form_HTML = e.target
      const form_values = new FormData(form_HTML)
      const form_fields = {
        email: "",
        password: ""
      }
      const form_values_object = extractFormData(form_fields, form_values)
      const response = await POST(
        `${ENVIROMENT.URL_BACKEND}/api/auth/login`, {
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify(form_values_object)
      }
      )
      console.log({ response })
      const access_token = response.payload.token
      sessionStorage.setItem('access_token', access_token)
      sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
      navigate('/home')
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <div className='qPasaLogin'>
        <h2 className='quePasa'>qPasa!</h2>
      </div>
      <div className='fondoLogin'>
        <h1 className='tituloLogin'>Iniciá sesión</h1>
        <div className='formularioLogin'>
          <form className='formLogin' onSubmit={handleSubmitLoginForm}>
            <div>
              <label className='labelEmail' htmlFor='email'>Email</label><br />
              <input name='email' type='email' id='email' placeholder='juanperon@gmail.com' />
            </div>
            <div>
              <label className='labelContraseña' htmlFor='password'>Contraseña</label><br />
              <input name='password' type='password' id='password' placeholder='Juan-Peron_123' />
            </div>
            <button className='botonInicioLogin' type='submit'>Iniciar sesión</button>
          </form>
        </div>
        <div className='spanLogin'>
          <span><b>¿Te olvidaste la contraseña?</b> <Link to='/forgot-password' className='restablecer'><b>Restablecer</b></Link></span><br />
          <span><b>Si no tenés una cuenta,</b> <Link to='/register' className='registrate'><b>registrate</b></Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login