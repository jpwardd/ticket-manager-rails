import React, { useState } from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom'

type formElement = React.FormEvent<HTMLFormElement>
type inputElement = React.ChangeEvent<HTMLInputElement>

export const Login: React.FC<ILoginProps> = (props) => {
  const [loginFormData, setLoginFormData ] = useState<ILoginState>({
    email: '',
    password: ''
  })

 const onSubmit = (e: formElement) => {
    const { email, password } = loginFormData;
    axios.post("http://localhost:3001/sessions",
    {
      user: {
        email: email,
        password: password
      }
    },
    { withCredentials: true }
    )
    .then(response => {
      console.log(response.data)

      if (response.data.logged_in) {
        props.history.push('/dashboard')
      }
    })
    .catch(err => {
      console.log("login error", err);
    });
    e.preventDefault();
  }

  const handleEmailChange = (e: inputElement) => {
    setLoginFormData({ ...loginFormData, email: e.target.value })
  }
  const handlePasswordChange = (e: inputElement) => {
    setLoginFormData({ ...loginFormData, password: e.target.value })
  }
  const { email, password } = loginFormData;
   return(

     <div>
      <form onSubmit={onSubmit}>
        <input onChange={handleEmailChange} type="email" name="email" value={email} id="" />
        <input onChange={handlePasswordChange} type="password" name="password" value={password} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

interface ILoginProps extends RouteComponentProps<{ history: string }> {

}

interface ILoginState {
  email: string;
  password: string;
}

export default Login