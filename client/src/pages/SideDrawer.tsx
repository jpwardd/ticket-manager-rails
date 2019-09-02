import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const NavBarContainer = styled.div`
  .side-drawer {
  height: 100%;
  background: pink;
  position: fixed;

  top: 2;
  left: 2;
  width: 70%;
  max-width: 200px;
  z-index: 200;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}

.side-drawer.open {
  transform: translateX(0)
}

.side-drawer ul {
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  
}

.side-drawer a {
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.side-drawer a:hover,
.side-drawer a:active {
  color: #dc7f9b;
}

`

type Props = ISidDrawerProps

const SideDrawer: React.FC<Props> = (props) => {
  return(
    <NavBarContainer>
      <nav className="side-drawer open">
        <ul>
          <li onClick={props.servicesToggle}>Services</li>
          <li onClick={props.openTicketsToggle}>Clients</li>
          <li>Staff</li>
        </ul>
      </nav>
    </NavBarContainer>
  )
}

interface ISidDrawerProps {
  servicesToggle: () => void
  openTicketsToggle: () => void
}

export default SideDrawer