import React,{ Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';

class UserList extends Component {
    componentWillMount(){
        this.props.fetchUser();
    }

    randerUser(user){
        return (
                <div className ="Box" key={ user.id }>
                    <h3 classNme ="Boxitem">{ user.name }</h3>
                    <div className="Box">
                        <h5>Address</h5>
                        <div >{ user.address.city }</div>
                        <div >{ user.address.street }</div>
                        <div >{ user.address.suite }</div>
                    </div>
                </div>

            )
    }
    render(){
        return(
            <div >{ this.props.users.map( this.randerUser ) } </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users
    }
}
export default connect(mapStateToProps,actions)(UserList);
