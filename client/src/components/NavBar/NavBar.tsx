import React from 'react'
import { Box } from 'grommet';
import styled from 'styled-components'

const NavBarContainer = styled.header`
  width: 100%;
  height: 56px;
  top: 0;
  left: 0;
  background: black;
`

const NavBar: React.FC = () => {
  return(
    <Box>
      <NavBarContainer>
        <nav>

        </nav>
      </NavBarContainer>
    </Box>
  )
}

export default NavBar