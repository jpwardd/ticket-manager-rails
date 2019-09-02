import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getServices, editService } from '../../store/actions/ServiceActions';
import { bindActionCreators } from 'redux';
import { loadUser } from '../../store/actions/AuthActions';
import MaterialTable from 'material-table'
import './services.css';
import { Box, Button } from 'grommet';
import CreateServiceForm from '../../components/services/CreateServiceForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const Services = ({ loadUser, getServices, services, editService, user: { user } }) => {
  useEffect(() => {
    getServices();
    loadUser();
  }, [getServices, loadUser]);
 

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name'},
      { title: 'Price', field: 'price'},
      { title: 'Category', field: 'category'}
    ],
    open: false,
  })

  const { columns } = state;

 
  const onEditSubmit = (newData) => {
    const { id, name, price, category } = newData;
    editService(id, name, price, category);
  }

   function handleClickOpen() {
     setOpen(true);
   }

   function handleClose() {
     setOpen(false);
   }
  
  return (
     <Box margin="20px" pad="20px">
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <CreateServiceForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
     <Box
      align="end"
      margin='20px'
     >
      <Button onClick={handleClickOpen}>New Service</Button>
     </Box>
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
