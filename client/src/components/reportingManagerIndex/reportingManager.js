import React, { Component } from 'react';
import { Alert, classNamesShape } from 'reactstrap';
import { addEmployee, getEmployee } from '../../actions/userActions';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Select from 'react-select'
import Axios from 'axios'

const options = [
    { value: 'approved', label: 'approved' },
    { value: 'canceled', label: 'canceled' }
]

class ReportingManager extends Component {
    constructor() {
        super()
        this.state = {
            items: [], success: false, isGetting: false, selectedOption: null, selectedItem: {}, value: ''
        }
        this.getEmployee = this.getEmployee.bind(this)
    }

    componentDidMount() {
        this.getEmployee()
    }

    async getEmployee() {
        this.setState({ isGetting: true })
        const res = await getEmployee()
        const {payload} = res
        const filteredList = payload.filter(item => item.applicationStatus !== 'canceled')
        this.setState({ items: filteredList, success: res.success, isGetting: false })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
        this.upDateStatus(selectedOption)
    }

    upDateStatus = (data) => {
        const { _id } = this.state.selectedItem
        Axios.put(`/api/users/statusupdate/${_id}/status/${data.value}`).then(res => {
            if (res) {
                this.getEmployee()
                NotificationManager.success('Status updated successfully')
            }
        }).catch(err => {
            console.log('err', err)
            NotificationManager.error("Status not updated")
        })
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
            let customStyles = {
                container: provided => ({
                    ...provided,
                    width: 150
                })
            };
            return (
                <tr key={idx} onClick={() => this.setState({ selectedItem: row })} className="mt-3 pt-3">
                    <th scope="row">{row.empName}</th>
                    <td><span className="badge badge-primary p-2">{row.applicationStatus}</span></td>
                    <td>{row.empDesignation}</td>
                    <td>{row.amount}</td>
                    <td>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            styles={customStyles}
                        />
                    </td>
                </tr>
            )
        })
    }

    render() {
        let { isGetting } = this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-sm">
                            <thead className="table-secondary m-4">
                                <tr className="mt-2">
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Confirm Application</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isGetting ? <p className="text-center">Loading...</p> : this.renderApplicationTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}

export default ReportingManager