import React,{ Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import LogIn from '../../register/user-components/log_in';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = { logInClick: false };

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.closeButton = this.closeButton.bind(this);

    }
    logIn(){
        if(sessionStorage.getItem('AUTHENTICATED')){
            return(
                <div>
                    <button name='logOut' type='button' onClick = { this.handleLogOut } >LogOut</button>
                </div>
            )
        }
        return (
            <button name='logIn' type='button' onClick = { this.handleLogIn } >LogIn</button>
        )
    }

    handleLogOut(){
        sessionStorage.removeItem('AUTHENTICATED');
        window.location.reload();
        return (
            <button  name='logIn' type='button'  onClick= { this.handleLogIn } >LogIn</button>
        )
    }
    handleLogIn(){
        this.setState( { 'logInClick': true } );

    }
    handleClose(){
        this.setState( { 'logInClick': false });
    }
    closeButton(){
        return(
            <button className="Close" type="button" name="close" value="" onClick = { () => { this.handleClose() }}>Close</button>
        )
    }
    logInTrigger(){
            if(this.state.logInClick){
                return (
                <div className="LogInWrapperModal">
                    { this.closeButton() }
                    <LogIn/>
                </div>
                )
            }
            return null
    }

    render(){
        return(
            <header className="Header">
                <nav className="MainMenu">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Casino">Casino</Link>
                        </li>
                    </ul>
                </nav>
                <nav className="AccountMenu">
                    <ul>
                        <li>
                            <Link to="/Profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/Register">Register</Link>
                        </li>
                        <li>
                            { this.logIn() }
                        </li>
                    </ul>
                </nav>
                { this.logInTrigger() }
            </header>
        )
    }
}
function mapStateToProps(state){
    return { authenticated: state.auth }
}

export default connect(mapStateToProps)(Header);
