import React from 'react';
import { Switch, Route } from 'react-router-dom'

// Components
import dashboard from './dashboard';
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import employeeManagement from './employeeManagement';
import reportingManagerIndex from './reportingManagerIndex';
import AccountsIndex from './AccountsIndex';
import { APPLICATIONS, EMPLOYEE, REPORTING_MANAGER, LOAD_APP } from './authentication/routes/routesConstant';

export default class SwitchRoute extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={LOAD_APP} component={dashboard} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/employee' component={employeeManagement} />
                    <Route exact path='/admin' component={reportingManagerIndex} />
                    <Route exact path='/accounts' component={AccountsIndex} />
                </Switch>
            </div>
        );
    }
}