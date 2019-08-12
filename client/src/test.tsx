import React, { useEffect, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Service } from '../../store/types';
import { getServices, ServiceActions } from '../../store/actions/ServiceActions'
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { AppState } from '../../store/store'
import { loadUser } from '../../store/actions/AuthActions';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MaterialTable from 'material-table'
import './services.css'

type Props = IServiceProps & LinkStateProp & LinkDispatchProps

const Services: React.FC<Props> = ({ loadUser, getServices, services, user }) => {
  useEffect(() => {
    getServices()
    loadUser()
  }, [getServices, loadUser])


  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(service => (
            <TableRow key={service.id}>
              <TableCell align="center" component="th" scope="row">{service.name}</TableCell>
              <TableCell align="center" scope="row">{service.price}</TableCell>
              <TableCell align="center" scope="row">{service.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

interface IServiceProps {


}

interface LinkStateProp {
  services: Service[]
  user: {}
}

interface LinkDispatchProps {
  getServices: () => any
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


import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Service } from '../../store/types';
import { getServices, ServiceActions } from '../../store/actions/ServiceActions'
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { AppState } from '../../store/store'
import { loadUser } from '../../store/actions/AuthActions';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './services.css'
import { TextInput, Button } from 'grommet';

type Props = IServiceProps & LinkStateProp & LinkDispatchProps

const Services: React.FC<Props> = ({ loadUser, getServices, services, user }) => {
  useEffect(() => {
    getServices()
    loadUser()
  }, [getServices, loadUser])

  const [state, setState] = useState({
    edit: false
  })
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(service => (
            <TableRow key={service.id}>

              {!state.edit ? <TableCell align="center" component="th" scope="row">{service.name}</TableCell> : <TextInput placeholder={service.name} />}

              <TableCell align="center" scope="row">{service.price}</TableCell>
              <TableCell align="center" scope="row">{service.category}</TableCell>
              <Button>Edit</Button>
              <Button>delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

interface IServiceProps {


}

interface LinkStateProp {
  services: Service[]
  user: {}
}

interface LinkDispatchProps {
  getServices: () => any
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
