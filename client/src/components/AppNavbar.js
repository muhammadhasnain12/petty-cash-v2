import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    DropdownToggle,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Container, UncontrolledDropdown, DropdownMenu, DropdownItem
} from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { LOAD_APP } from './authentication/routes/routesConstant';
import { logoutUsers } from '../actions/userActions';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            user: JSON.parse(localStorage.getItem('react_login_app')),
            email : ''

        };
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.checkuser()
    }
    
    checkuser = () => {
        if(this.state.user){
            let {user} =this.state.user
            this.setState({ email: user.email})
        }else{
            this.props.history.push('/login')
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async logout() {
        const res = await logoutUsers();
        if (res.success) {
            this.props.history.push('login')
        }
    }


    render() {
        return (
            <div>
                <div>
                    <Navbar dark expand="md" className="main-bg-color">
                        <Container>
                            <NavbarBrand tag={Link} to={LOAD_APP}>
                                <span className="header-text text-white">Management System (beta)</span>
                            </NavbarBrand>
                            <UncontrolledDropdown >
                                <DropdownToggle nav caret className="text-white">
                                    {this.state.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => this.logout()}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Container>
                    </Navbar>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(AppNavbar);