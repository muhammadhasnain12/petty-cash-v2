import React, { Component }from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../common/applicationContainer';
import AccountsReport from './accountsReport';
class AccountsDashboard extends Component {
render(){
    return (
        <Container icon="faHome" title={"Dashboard"} >
            <AccountsReport/>
        </Container>
    )
}
}

export default withRouter(AccountsDashboard)