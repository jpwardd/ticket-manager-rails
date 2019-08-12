import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Box, TextInput, Form, Button } from 'grommet';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { inputElement, formElement } from './Login';
import { register } from '../../store/actions/AuthActions'
import { AppState } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AuthActions } from '../../store/actions/AuthActions';
import { bindActionCreators } from 'redux';

const Container = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin-top: 50px;
  border: 1px solid black;
  width: 40%;
`
const InputContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  img {
    width: 200px;
    height: 200px;
  }
`

const RegisterOrLogin = styled.div`
  border: 1px solid black;
  margin-top: 20px;
  margin: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-bottom: 20px solid black;
  width: 40%;
 
  h3 {
    color: #AAAAAA;
    text-align: center;
  }
`


type Props = IRegisterProps & LinkStateProp & LinkDispatchProps

const Register: React.FC<Props> = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, password, password2 }: {firstName: string, lastName: string, email: string, password: string, password2: string} = formData;

  const onChange = (e: inputElement) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e: formElement) => {
    e.preventDefault();
  

    if (password !== password2) {
      console.log('hello')
    } else {
      register(firstName, lastName, email, password);
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>

      <Box align="center" style={{ background: '#fafafa' }}>
        <Container>
          <InputContainer>
            <Box align="center">
              <h2>Register</h2>
            </Box>
            <Form onSubmit={(e: formElement) => onSubmit(e)}>
              <Box margin="10px">
                <TextInput
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e: inputElement)=> onChange(e)}
                  />
              </Box>

              <Box margin="10px">
                <TextInput
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e: inputElement) => onChange(e)}
                  />
              </Box>

              <Box margin="10px">
                <TextInput
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e: inputElement) => onChange(e)}
                  />
              </Box>

              <Box margin="10px">
                <TextInput
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e: inputElement) => onChange(e)}
                  />
              </Box>

              <Box margin="10px">
                <TextInput
                  type="password"
                  name="password2"
                  placeholder="re-enter password"
                  value={password2}
                  onChange={(e: inputElement)=> onChange(e)}
                />
              </Box>
              <Button
                label="Register"
                style={{ width: '100%', height: 40, backgroundColor: 'black', color: 'white', fontSize: 18 }}
                type="submit"
              />
             
            </Form>


          </InputContainer>


        </Container>
        <RegisterOrLogin>
          <h3>already have an account?  <Link style={{ color: '#dc7f9b', textDecoration: 'none' }} to="/">sign in</Link></h3>
        </RegisterOrLogin>
      </Box>

    </Fragment>
  )
}

interface IRegisterProps {

}

interface LinkStateProp {
  isAuthenticated: boolean
}

interface LinkDispatchProps {
  register: (firstName: string, lastName: string, email: string, password: string) => void
}


const mapStateToProps = (state: AppState, ownProps: IRegisterProps) => ({
  isAuthenticated: state.authState.isAuthenticated
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AuthActions>, ownProps: IRegisterProps): LinkDispatchProps => ({
  register: bindActionCreators(register, dispatch)
})

// todo map dispatch to props and type safe this whole component.

export default connect(mapStateToProps, mapDispatchToProps)(Register)