import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getServices, editService } from '../../store/actions/ServiceActions'
import { bindActionCreators } from 'redux';
import { loadUser } from '../../store/actions/AuthActions';
import MaterialTable from 'material-table'
import './services.css'
import { Box } from 'grommet';


const Services = ({ loadUser, getServices, services, editService }) => {
  useEffect(() => {
    getServices()
    loadUser()
  }, [getServices, loadUser])

  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name'},
      { title: 'Price', field: 'price'},
      { title: 'Category', field: 'category'},
    ]
  })

  const { columns } = state

 
  const onEditSubmit = (newData) => {
    let id = newData.id
    let name =  newData.name 
    let price = newData.price
    let category = newData.category
    editService(id, name, price, category)
  }
  return (
     <Box margin="20px" pad="20px">
      <MaterialTable
        title="Services"
        columns={columns}
        data={services}
        editable={{
           onRowUpdate: (newData, oldData) =>
             new Promise(resolve => {
               setTimeout(() => {
                 resolve();
                 const data = services;
                 data[data.indexOf(oldData)] = newData;
                 onEditSubmit(newData)
                 setState({ ...state })
               }, 600);
             }),
        }}
      > 
      </MaterialTable>
     </Box>
  )
}


const mapStateToProps = (state) => ({
  services: state.services.services,
  user: state.authState
})

const mapDispatchToProps = (dispatch) => ({
  getServices: bindActionCreators(getServices, dispatch),
  loadUser: bindActionCreators(loadUser, dispatch),
  editService: bindActionCreators(editService, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Services)
