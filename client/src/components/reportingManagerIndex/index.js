import React, { Component }from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../common/applicationContainer';
import ReportingManager from './reportingManager';
class ReportingManagerDashboard extends Component {
render(){
    return (
        <Container icon="faHome" title={"Dashboard"} >
            <ReportingManager/>
        </Container>
    )
}
}

export default withRouter(ReportingManagerDashboard)