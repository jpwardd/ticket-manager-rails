import React, { useState } from 'react';
import { 
  Box, 
  TextInput, 
  Form, 
  Button
} from "grommet";
import { OPTIONS } from '../../constants/options';
import { formElement, inputElement, User, Service } from '../../store/types';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ServiceActions, getServices } from '../../store/actions/ServiceActions';
import { bindActionCreators } from 'redux';
import { createService } from '../../store/actions/ServiceActions'

type Props = ICreateServiceFormProps & LinkDispatchProps;

const CreateServiceForm: React.FC<Props> = (props) => {
  const [state, setState] = React.useState<{name: string; price: string, category: string, options: string[]}>({
    name: '',
    price: '',
    category: '',
    options: OPTIONS
  })

  const { name, price, category, options } = state;

  const onChange = (e: inputElement) => setState({ ...state, [e.target.name]: e.target.value })
  const handleChange = (name: keyof typeof state) => (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const onSubmit = (e: formElement) => { 
    const { createService, closeModal } = props;
    e.preventDefault();
    const { name, price, category} = state;
    createService(name, price, category);
    closeModal()
  }

  return(
    <Box width="medium" margin="50px">
      <Box pad="0" margin="0" align='end'>
        <i onClick={props.closeModal} className="material-icons">
          close
        </i>
      </Box>
    <Box align='center'>
      <h4>New Service</h4>
    </Box>
     <Form onSubmit={(e: formElement) => onSubmit(e)}>
       <Box margin='10px'>
        <TextInput 
          type='text'
          name='name'
          placeholder='name'
          value={name}
          onChange={(e: inputElement)=> onChange(e)}
        />
       </Box>
      <Box margin='10px'>
        <TextInput
          type='text'
          name='price'
          placeholder='price'
          value={price}
          onChange={(e: inputElement)=> onChange(e)}
        />
       </Box>
      <Box margin='10px'>
      <select value={category} onChange={handleChange('category')}>
        {OPTIONS.map((option: string, index: number) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      </Box>
      
        <Button 
          label="Add"
          type="submit"
          style={{ width: '100%', height: 40, backgroundColor: 'black', color: 'white', fontSize: 18 }}
        />
     </Form>
    </Box>
  );
}

interface ICreateServiceFormProps {
  closeModal: () => void;
  userId: number;
}

interface LinkDispatchProps {
  createService: (name: string, price: string, category: string) => void
  getServices: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ServiceActions>, ownProps: ICreateServiceFormProps): LinkDispatchProps => ({
  createService: bindActionCreators(createService, dispatch),
  getServices: bindActionCreators(getServices, dispatch)
})

export default connect(null, mapDispatchToProps)(CreateServiceForm);