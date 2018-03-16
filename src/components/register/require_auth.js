import React,{ Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

export default function( ComposedComponent ) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };
        componentWillMount(){
            console.log(this.props);
            if(!this.props.authCreator){
                this.context.router.push('/')
            }
        }
        render(){
            return <ComposedComponent { ...this.props } />
        }
    }

    function mapStateToProps(state){
        return { authCreator: state.auth }
    }

    return connect(mapStateToProps)(Authentication);
}