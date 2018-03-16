import React,{ Component } from 'react';
import { connect } from 'react-redux';

class Select extends Component {
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
        select: React.PropTypes.string,
        selectText: React.PropTypes.string
        };

    render(){
        var wrapperClass = 'form-group';
        if(this.props.error && this.props.error.length >0){
            wrapperClass += ' ' + 'has-error';
        }

        return(
            <div className={wrapperClass}>
                <lable htmlFor={ this.props.name }>{ this.props.label }</lable>
                <div className="field">
                    <select
                        name = { this.props.name }
                        onChange = { this.props.onChange }
                    >
                        <option value={ this.props.select }>{ this.props.selectText }</option>
                        { this.props.options }
                    </select>
                    <div className="Error">{ this.props.error }</div>
                </div>
            </div>

        )
    }
}

export default Select;