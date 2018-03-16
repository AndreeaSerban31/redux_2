import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import { bindActionCreators } from 'redux';


import { auth } from '../../../actions/index';
import { fetchUser } from '../../../actions/index';
import UserList from './user_list';

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', password: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    componentWillMount(){
        this.props.actions.fetchUser();
        this.props.actions.authCreator();
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        let AUTHENTICATED = [];
        this.props.users.map((user) => {
            // light login need server validation and more validations on front end
            if((user.username === this.state.username) && ( user.id.toString() === this.state.password.toString())){
                sessionStorage.setItem('AUTHENTICATED', true );
                AUTHENTICATED.push(user);
            }
        });
        this.props.actions.authCreator(sessionStorage.getItem('AUTHENTICATED'));
        /*let currentURL = this.context.location.pathname;*/
        /*this.context.router.go(currentURL);*/
        return AUTHENTICATED;
    }

    render(){
        return(
            <div className="LogInWrapper">
                <div className="LogInForm">
                    <form autoComplete="on" >
                        <div className="UserNameWrap">
                            <label htmlFor="UserName" className="Label">Username:</label>
                            <input id="UserName" type="text" name="username" value = { this.state.username } onChange={ this.handleChange } placeholder="Input username" required  autoComplete="username"/>
                        </div>
                        <div className="PasswordWrap">
                            <label htmlFor="Password" className="Label">Password:</label>
                            <input type="password" name="password" value = { this.state.password } onChange = { this.handleChange } placeholder="Input pass" required autoComplete="password" />
                        </div>
                        <button className="Button LogIn" type='button' name="submit" value='Login' onClick = { (e) => { this.handleSubmit(e)} } >Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users
    }
}

function mapDispatchToProp(dispatch){
    return {
        actions: {
            authCreator: bindActionCreators(auth, dispatch),
            fetchUser: bindActionCreators(fetchUser, dispatch)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(LogIn);

