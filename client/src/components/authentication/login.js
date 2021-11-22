import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { signinUser } from '../../actions/userActions';
import { NotificationManager, NotificationContainer } from 'react-notifications';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInError: '',
            token: '',
            storage: JSON.parse(localStorage.getItem('react_login_app')),
            userName: '',
            password: '',
            isDisable: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit() {
        this.setState({ isDisable: true })

        const loginUser = {
            userName: this.state.userName,
            password: this.state.password
        }
        console.log(loginUser)
        const res = await signinUser(loginUser);
        if (res.success) {
            NotificationManager.success(res.message);
            this.setState({ signInError: res.message, token: res.token, isDisable: false, });
            this.props.history.push('/')
        }
        else {
            NotificationManager.error(res.message);
            this.setState({ signInError: res.message, isDisable: false, });
        }
    }

    render() {
        const {
            signInError,
            token,
            isDisable
        } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-12">
                        <nav className="navbar navbar-light p-0" style={{ backgroundColor: '#00b591' }}>
                            <div className="container-fluid">
                                <li style={{ padding: '8px', listStyle: 'none' }}>
                                    <h5 className="header-text text-white">Management System (beta)</h5>
                                </li>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="vertical-center col-md-4 col-12 shadow-lg">
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup className="text-left">
                                <Label className="mr-sm-2 ">User Name</Label>
                                <Input type="email" name="userName" id="userName" placeholder="Email" onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup className="text-left">
                                <Label className="mr-sm-2">password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
                            </FormGroup>
                        </Form>
                        <Row>
                            <Col> {(signInError) ? (<p> {signInError} </p>) : (null)} </Col>
                        </Row>
                        <div className="d-flex justify-content-between mt-2">
                            <div className="form-check mt-2">
                                <input className="form-check-input" style={{ marginTop: '.2rem' }} type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                            </div>
                            <div className="" style={{ marginTop: '3px' }}>
                                <button type="button" className="btn btn-link text-theme">Forgot Password ?</button>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md">
                                <button className="btn btn-login w-100 text-white" style={{ backgroundColor: '#00b588' }} type="submit" disabled={isDisable ? true : false} onClick={() => this.onSubmit()} >Sign In</button>
                            </div>
                        </div>
                        <div className="mt-4 d-flex">
                            <p>Not a member, click here to  <Link to='/signup' className="text-theme">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(Login)