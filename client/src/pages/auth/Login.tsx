import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/AuthActions'
import { IAppState } from '../../store/store';

type formElement = React.FormEvent<HTMLFormElement>
type inputElement = React.ChangeEvent<HTMLInputElement>

export const Login: React.FC<ILoginProps> = (props) => {
  const [loginFormData, setLoginFormData ] = useState<ILoginState>({
    email: '',
    password: ''
  })
  const { email, password } = loginFormData;
  
  const onSubmit = (e: formElement) => {
    const { email, password } = loginFormData;
    props.loginUser(email, password)
    props.history.push('/dashboard')
    e.preventDefault();
  }

  const handleEmailChange = (e: inputElement) => {
    setLoginFormData({ ...loginFormData, email: e.target.value })
  }
  const handlePasswordChange = (e: inputElement) => {
    setLoginFormData({ ...loginFormData, password: e.target.value })
  }
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
  loginUser: (email: string, password: string) => void
}

interface ILoginState {
  email: string;
  password: string;
}


export default connect<IAppState>(null, { loginUser })(Login)