import React,{ Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    render(){
        return(
            <footer className="Footer">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/TermsAndConditions">Terms and conditions</Link>
                    </li>
                    <li>
                        <Link to="/About us">About us</Link>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer;