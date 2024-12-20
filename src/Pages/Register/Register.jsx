import React from 'react'
import { Link } from 'react-router-dom'
import { extractFormData } from '../../utils/extractFormData.js'
import useForm from '../../Hooks/useForm'
import { getUnnauthenticatedHeaders, POST } from '../../fetching/fetching.js'
import ENVIROMENT from '../../enviroment.js'

const Register = () => {
  const form_fields = {
    name: "",
    email: "",
    password: ""
  }
  const {form_values_state, handleChangeInputValue} = useForm(form_fields)
  console.log(form_values_state)
  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault()
    const form_HTML = e.target
    const form_values = new FormData(form_HTML)
    const form_values_object = extractFormData(form_fields, form_values)
    
    const response = await POST(
      `${ENVIROMENT.URL_BACKEND}/api/auth/register`, {
        headers: getUnnauthenticatedHeaders(),
        body: JSON.stringify(form_values_object)
      }
    )
    console.log({response})
  }
  return (
    <div>
      <h1>Registrate</h1>
      <form onSubmit={handleSubmitRegisterForm}>
        <div>
          <label htmlFor='name'>NOMBRE</label><br />
          <input
            name='name' 
            type='text' 
            id='name' 
            placeholder='Juan Perón' 
            onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor='email'>CORREO ELECTRÓNICO</label><br />
          <input 
            name='email' 
            type='email' 
            id='email' 
            placeholder='juanperon@gmail.com' 
            onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor='password'>CONTRASEÑA</label><br />
          <input 
            name='password' 
            type='password' 
            id='password' 
            placeholder='Juan-Peron_123'
            onChange={handleChangeInputValue}/>
        </div>
        <button type='submit'>Registrarme</button>
      </form>
      <span>Si ya tenés una cuenta, <Link to='/login'>iniciá sesión</Link></span>
    </div>
  )
}

export default Register