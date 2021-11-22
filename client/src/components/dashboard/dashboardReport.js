import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


class DashboardReport extends Component {
    constructor() {
        super()
    }

    get_order = () => {
        return {
            labels: ['Count', 'Done', 'Approved'],
            datasets: [
                {
                    label: "Order Stats",
                    data: ['26', '10', '16'],
                    backgroundColor: ['#003f5c', '#7a5195', '#ef5675', '#ffa600'],
                    hoverBackgroundColor: ['#003f5c', '#7a5195', '#ef5675', '#ffa600'],
                    borderWidth: 0,
                    display: true,
                    barPercentage: 0.5,
                    barThickness: 45,
                    maxBarThickness: 45,
                    minBarLength: 9,
                    beginAtZero: true
                }
            ]
        }
    }
    render() {
        let legendOpts = {
            display: false,
            position: 'bottom',
            fullWidth: true,
            reverse: false,
            labels: {
                fontColor: 'black'
            },
            responsive: true
        }

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        return (
            <div className="row text-center">
                <div className="col-md-1"></div>
                <div className="col-md-4">
                    <h2 className="m-4 text-center">Total Application</h2>
                    <div className="mt-4">
                        <div className="card card-body">
                            <div className="media">
                                <div className="mr-3 align-self-center">
                                    <i className="icon-database icon-3x text-theme"></i>
                                </div>

                                <div className="media-body text-right">
                                    <h3 className="mb-0">
                                        26
                                    </h3>
                                    <span className="text-uppercase font-size-xs">Applications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="card card-body">
                            <div className="media">
                                <div className="mr-3 align-self-center">
                                    <i className="icon-floppy-disk icon-3x text-theme"></i>
                                </div>

                                <div className="media-body text-right">
                                    <h3 className="mb-0">
                                        10
                                    </h3>
                                    <span className="text-uppercase font-size-xs">Approved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                    <h2 className="m-4 text-center">Application Staus</h2>
                    <div className="dashboard-charts">
                        <Bar
                            data={this.get_order()}
                            width={25}
                            height={15}
                            legend={legendOpts}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardReport