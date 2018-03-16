import React,{ Component } from 'react';
import { connect } from 'react-redux';

class Input extends Component {
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
        autocomplete: React.PropTypes.string,
        title: React.PropTypes.string,
        requierd: React.PropTypes.bool,
        defaultChecked: React.PropTypes.bool
    };

    render(){
        var wrapperClass = 'form-group';
        if(this.props.error && this.props.error.length >0){
            wrapperClass += ' ' + 'has-error';
        }
        if( this.props.type === 'checkbox'){
            wrapperClass += ' ' + 'checkbox';
        }
        if( this.props.type === 'radio'){
            wrapperClass += ' ' + 'radio';
        }
        return(
            <div className={wrapperClass}>
                <lable htmlFor={ this.props.name }>{ this.props.label }</lable>
                <div className="field">
                    <input type={ this.props.type }
                           name={ this.props.name }
                           className="form-control"
                           placeholder={ this.props.placeholder }
                           ref={ this.props.name }
                           value={ this.props.value }
                           onChange={ this.props.onChange }
                           autoComplete={ this.props.autocomplete }
                           title={ this.props.title }
                           requierd={ this.props.requierd }
                           defaultChecked= { this.props.defaultChecked }
                    />
                </div>
                <div className="Error">{ this.props.error }</div>
            </div>

        )
    }
}

export default Input;