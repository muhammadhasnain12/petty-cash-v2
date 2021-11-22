import React, { Component }from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../common/applicationContainer';
import EmployeeReport from './employee';
import { getFromStorage } from '../../utils/storage';

class EmployeeDashboard extends Component {
    constructor(props){
        super(props);

    }
    componentWillMount() {
        console.log("Please check token")
        const obj = getFromStorage('react_login_app');
        // const { token } = obj;
        if(obj === null){
            this.props.history.push('/login')
        }
    }
render(){
    return (
        <Container icon="faHome" title={"Employee"}>
            <EmployeeReport/>
        </Container>
    )
}
}

export default withRouter(EmployeeDashboard)