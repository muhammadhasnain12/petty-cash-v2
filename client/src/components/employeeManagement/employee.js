import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { addEmployee, getEmployee } from '../../actions/userActions';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Axios from 'axios';


class EmployeeReport extends Component {
    constructor() {
        super()
        this.state = {
            empName: '', empDesignation: '', amount: '', isDisable: false, items: [], success: false, isGetting: false, value: ''
        }
        this.addEmployee = this.addEmployee.bind(this)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.getEmployee()
    }

    //Get Employee Details
    async getEmployee() {
        const res = await getEmployee()
        this.setState({ items: res.payload, success: res.success })
    }

    //Add employee
    async addEmployee() {
        const employeeDetails = {
            empName: this.state.empName,
            empDesignation: this.state.empDesignation,
            amount: this.state.amount
        }
        console.log(employeeDetails)
        const res = await addEmployee(employeeDetails);
        if (res.success) {
            NotificationManager.success(res.message);
        }
        else {
            NotificationManager.error(res.message);
            this.setState({ signInError: res.message, isDisable: false, });
        }
    }

    renderApplicationTable = () => {
        let { items } = this.state
        if (!items.length) {
            return (
                <tr>
                    <td><p className="text-center">Nothing to show!</p></td>
                </tr>
            )
        }
        return items.map((row, idx) => {
            return (
                <tr key={idx} className="mt-3 pt-3">
                    <th scope="row">{row.empName}</th>
                    <td><span className="badge badge-primary p-2">{row.applicationStatus}</span></td>
                    <td>{row.empDesignation}</td>
                    <td>{row.amount}</td>
                </tr>
            )
        })
    }


    render() {
        let { isGetting } = this.state
        return (
            <div className="row text-center">
                <div className="col-md-6 col-12">
                    <h2 className="m-4 text-center">Apply for petty cash</h2>

                    <div className="mt-4 p-3">
                        <Form>
                            <FormGroup className="text-left">
                                <Label className="mr-sm-2 ">Employee Name</Label>
                                <Input type="text" name="empName" id="empName" placeholder="Name" onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup className="text-left">
                                <Label className="mr-sm-2 ">Employee Designation</Label>
                                <Input type="text" name="empDesignation" id="empDesignation" placeholder="Designation" onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup className="text-left">
                                <Label className="mr-sm-2">Required Amount</Label>
                                <Input type="number" name="amount" id="amount" placeholder="Amount" onChange={this.onChange} />
                            </FormGroup>

                        </Form>
                        <div className="row mt-2">
                            <div className="col-md">
                                <button type="button" className="btn float-right text-white" style={{ backgroundColor: '#00b588' }} type="submit" onClick={() => this.addEmployee()} >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-sm">
                                <thead className="table-secondary m-4">
                                    <tr className="mt-2">
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isGetting ? <p className="text-center">Loading...</p> : this.renderApplicationTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}

export default EmployeeReport