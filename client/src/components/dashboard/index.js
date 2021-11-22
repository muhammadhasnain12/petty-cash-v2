import React, { Component }from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../common/applicationContainer';
import DashboardReport from './dashboardReport';
import { Employee, Reporting_Manager, Accounts } from '../../config/staticList';
import { getFromStorage } from '../../utils/storage';

class DashboardIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: []
        }

    }
    componentWillMount() {
        console.log("Please check token")
        const obj = getFromStorage('react_login_app');
        // const { token } = obj;
        if(obj === null){
            this.props.history.push('/login')
        }else{
            let email = obj.user.email
            if (email.split('@')[1] === 'admin.com') {
                console.log(Reporting_Manager)
                this.setState({ role: Reporting_Manager})
            }
            else if(email.split('@')[1] === 'accounts.com'){
                console.log(Accounts)
                this.setState({ role: Accounts})
            }else{
                console.log(Employee)
                this.setState({ role: Employee})
            }

        }
    }
render(){
    return (
        <Container icon="faHome" title={"Dashboard"} >
            <DashboardReport/>
        </Container>
    )
}
}

export default withRouter(DashboardIndex)