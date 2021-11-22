import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import AppNavbar from '../AppNavbar';
import SideMenu from '../sideMenue';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// export const ApplicationContainer = (props) => {
class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: null,
        }
        this.update_container_content = this.update_container_content.bind(this);
    }
    componentDidMount() {
        this.update_container_content()
    }
    
    update_container_content() {
        this.setState({
            content: this.props.children
        })
    }
    render() {
        return (
            <div className="virtual-body navbar-top-custom">
                <AppNavbar />
                <SideMenu />
                <div className="page-content">
                    {/* <!-- Main content --> */}
                    <div className="content-wrapper rounded-2 ml-2 mr-2 mt-4" >
                        <nav aria-label="breadcrumb " style={{ background: '#9e9e9e42' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active ml-2" aria-current="page">
                                    <FontAwesomeIcon icon={faHome} className={"mr-2"} size="1x" />
                                    {this.props.title}
                                </li>
                            </ol>
                        </nav>

                        {/* <!-- Content area --> */}
                        <div className="content">
                            {this.state.content}
                        </div>

                        {/* <Footer /> */}
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Container);