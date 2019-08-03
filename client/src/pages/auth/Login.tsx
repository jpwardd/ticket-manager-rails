import React, { useState, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { loginUser } from '../../actions/AuthActions'
import { IAppState } from '../../store/store';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Box, TextInput, Form, Button, Image } from 'grommet';

export type formElement = React.FormEvent<HTMLFormElement>
export type inputElement = React.ChangeEvent<HTMLInputElement>


const LoginContainer = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin-top: 50px;
  height: 100%;
  border: 1px solid black;
  margin: 70px 20px 20px 20px;
  width: 40%;
  a {
    text-decoration: none;
    color: #dc7f9b;
  }
`;

const InputContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  
  .logo {
    height: 200px;
    width: 200px;
  }

  button {
    width: 95%;
    background-color: black;
    color: white;
    font-weight: bold;
  }
`

export const Login: React.FC<ILoginProps> = ({loginUser, history}) => {
  const [loginFormData, setLoginFormData ] = useState<ILoginState>({
    email: '',
    password: ''
  })
  const { email, password }: {email: string, password: string} = loginFormData;
  
  const onSubmit = (e: formElement) => {
    const { email, password } = loginFormData;
    loginUser(email, password)
    history.push('/dashboard')
    e.preventDefault();
  }

  const handleEmailChange = (e: inputElement) => {
    setLoginFormData({ ...loginFormData, email: e.target.value })
  }
  const handlePasswordChange = (e: inputElement) => {
    setLoginFormData({ ...loginFormData, password: e.target.value })
  }
   return(

      <Fragment>
      <Box align="center"
        
      >
        <LoginContainer>
          <InputContainer>
            <Box align="center">
               <Image className="logo" src="https://lh3.googleusercontent.com/rHRakyyXD4a5pvwaBfBdKGY6mYOS54q1_6To-ZpVq1HaptEqBDz0g6Q6cFxGVJP0-ycqFwnnIS_WhoEpLpCIT_VesuoE4YYlo3LNb84JuxGgi3q1QpQL0F-AFaoMF3sNi5BrLZZIAyDfdJSJLWoWnyKu-3VQonLdbzxVJ7DzHmpm-aqhJ6qBgREkXGTrA1hwMqmg9GPXqhB4DLcHJPqzbOZPMv3eQ5BHlpuzGHCGr9DxjMCjUHOgHjEAsHKHSGeg2HQVqcvPUcdpc2XRMI5HMBlKUhZ3iBomxmiBbeTjPAHGaq0cb8ZNANRpDVwoYE15xO1i_bxnmulIW8mbSfSuVCIEx4CzOwBv_YDCfeVgn_BnMNi4D-dppCbUbHPBXw-K6xLsko-UGXqctDhq2XnTmtL4VCzMQNlwq--pC4E4Kmn7B2cJVLP38qCPjm84ShpArHOVRE_JnIBlG_Ov8_XKu0HBzlDTrXXn86EAAaYv-gSep5_rInt2BXqUskZ-4b60KSXpJXyLL7hTtqHCrwJbZrCNZzecEJyPnT43cAE0VqbXloxhMs1-v4tEKJggcQ2kennfWbMWpctVCd53a_73cQsrHbxaDtJo6ruddlN1yKnyLc-hA7PoDz2S2d7OBJ26MtXjcZmkbpj8NayhixcQ3CxJdvHEg70=s794-no" alt="Ticket Manager Logo" />
            </Box>
            <Form onSubmit={onSubmit}>

              <Box margin="10px">
                <TextInput
                  placeholder="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Box>

              <Box margin="10px">
              <TextInput
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Box>
            <Box align="center">
              <Button 
                label="Login"
                type="submit"
              />
            </Box>
          
            </Form>
          </InputContainer>
           <Box align="center">

             <h3>Need an account? <Link className="register-signup-link" to="register">Sign Up</Link></h3>
           </Box>
        </LoginContainer>
      </Box>
    </Fragment>
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