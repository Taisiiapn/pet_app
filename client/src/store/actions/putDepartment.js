import axios from 'axios';
import { actionFormFunctions } from './form';


const {
    fieldValueChange,
    fieldErrorChange
} = actionFormFunctions;



export const putDepartment = (id, values, successCallback) => dispatch => {

    const { name } = values
    const localStorageToken = JSON.parse(
        localStorage.getItem('token')
    )

    axios.put(`http://localhost:3000/api/departments/${id}/update`, 
        {
            name: name
        },
        {headers: {
            token: localStorageToken
        }}
    )
    .then(department => {
        dispatch(fieldValueChange(department.data))
        successCallback()
    })
    .catch (error => {
        dispatch(fieldErrorChange('name', error.response.data['name']))
    })
}