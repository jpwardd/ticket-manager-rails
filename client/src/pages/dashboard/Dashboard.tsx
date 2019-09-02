import React, { useState } from 'react'
import Services from '../services/Services';
import styled from 'styled-components'
import SideDrawer from '../SideDrawer';
import { statement } from '@babel/template';
import Clients from '../clients/Clients';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`

const Dashboard: React.FC = (props) => {
  const [dashboardState, setDashboardState] = useState({
    services: false,
    clients: false
  })

  return (
    <DashboardContainer>
      <div>
        {dashboardState.services && <Services />}
        {dashboardState.clients && <Clients />}
      </div>
    </DashboardContainer>
  );
}

export default Dashboard
