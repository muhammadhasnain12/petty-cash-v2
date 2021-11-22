import React, { Component } from 'react';
import { getFromStorage } from '../../utils/storage';
import { Reporting_Manager, Employee, Accounts } from '../../config/staticList';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons'

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Role: JSON.parse(localStorage.getItem('react_login_app')),
            role : []
        }
    }
    componentDidMount(){
        const obj = getFromStorage('react_login_app');
        // const { token } = obj;
        if(obj !== null){
            let email = obj.user.email
            if (email.split('@')[1] === 'admin.com') {
                this.setState({ role: Reporting_Manager})
            }
            else if(email.split('@')[1] === 'accounts.com'){
                this.setState({ role: Accounts})
            }else{
                this.setState({ role: Employee})
            }
        }
    }

    render() {
        if(this.state.Role){
            var {user} = this.state.Role
            var setName = user.userName
            console.log(setName, 'setName')
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light p-0 d-block" style={{ background:'#efefef'}}>
                    <div className="text-center text-theme bg-white p-4">
                        <p style={{ fontSize: 'xx-large' }}>Welcome,  <u>{setName}</u></p>
                    </div>

                    <div className="container-fluid p-0">
                        <div className="card-sidebar-mobile">
                            <div className="nav nav-sidebar" data-nav-type="accordion" style={{ display: '-webkit-inline-box' }}>
                                {Object.entries(this.state.role).map(([id, { icon, name, link }]) => (
                                    <li className="nav-link" key={id}>
                                        <Link to={link} className="font-weight-bold" style={{color: '#00A3B5'}}>
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


export default SideMenu;