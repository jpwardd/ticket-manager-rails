import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import axios from 'axios'

export class Login extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value })
  }
  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;
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
        this.props.history.push('/dashboard')
      }
    })
    .catch(err => {
      console.log("login error", err);
    });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.handleEmailChange} type="email" name="email" value={this.state.email} id="" />
          <input onChange={this.handlePasswordChange} type="password" name="password" value={this.state.password} />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

interface ILoginProps extends RouteComponentProps<{ history: string}> {

}

interface ILoginState {
  email: string;
  password: string;
}
export default Login
