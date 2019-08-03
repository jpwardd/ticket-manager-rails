import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Service } from '../../store/types';
import { getServices, ServiceActions } from '../../store/actions/ServiceActions'
import { ThunkDispatch } from 'redux-thunk';

import { bindActionCreators } from 'redux';
import { AppState } from '../../store/store'
import { loadUser } from '../../store/actions/AuthActions';

type Props = IServiceProps & LinkStateProp & LinkDispatchProps

const Services: React.FC<Props> = ({ loadUser, getServices, services, user}) => {
  useEffect(() => {
    getServices()
    loadUser()
  }, [getServices, loadUser])

  let allServices = services.map(service => {
    return (
      <div className="service-cards" key={service.id}>
        <header className="card-header">
          <h2>{service.category}</h2>
        </header>
        <h3>{service.name}</h3>
        <h3>{service.price}</h3>
      </div>
    )
  })  
  return (
    <div>
      {allServices}
    </div>
  )
}

interface IServiceProps {
 

}

interface LinkStateProp {
  services: Service[]
  loading: string
  user: {}
}

interface LinkDispatchProps {
  getServices: () => void
  loadUser: () => void
}


const mapStateToProps = (state: AppState, ownProps: IServiceProps) => ({
  services: state.services.services,
  user: state.authState
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ServiceActions>, ownProps: IServiceProps): LinkDispatchProps => ({
  getServices: bindActionCreators(getServices, dispatch),
  loadUser: bindActionCreators(loadUser, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Services)
