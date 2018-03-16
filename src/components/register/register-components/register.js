import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Input from './input-text';
import Select from './select';

import * as actions from '../../../actions';

class Register extends Component {
    componentWillMount(){
        this.props.fetchCountry();
    }

    constructor(props){
        super(props);
        this.state = {
            registerFields: {
                firstName: '',
                lastName: '',
                errors: ' ',
                email: ' ',
                password: ' ',
                retypePassword: ' ',
                username: ' ',
                address: ' ',
                city: ' ',
                postalCode: ' ',
                currency: ' ',
                mobile: '',
                question: '',

                selectCountry: ' ',
                selectDay: ' ',
                selectMonth: ' ',
                selectYear: ' ',
                selectMobilePrefix: ' ',

                chooseQuestion: ' ',
                termsConditions: ' ',
                defaultChecked: ' '
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.userFormIsValid = this.userFormIsValid.bind(this);
    }

    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.defaultChecked]: true
        });
    }

    handleOptions(countryS){
            return(
                countryS.map(country =>
                    <option  key={ country.alpha2Code } value={country.name}> {country.name} </option> )
            )
    }

    errorsText(inputName,errorType){
        let errorsText = inputName.charAt(0).toUpperCase() + inputName.toLowerCase().slice(1) ;
        let type = { lengthError: '', regexError: '', selectError: '',passNoMatch: '',radioError: ' ',checkError:''};

        switch(inputName){
           case 'firstName':
               if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 3 char";
                    return errorsText + type['lengthError'];
               }
               if(errorType === 'regexError'){
                   type['regexError'] = " must contain only characters. No digits";
                   return errorsText + type['regexError'];
               }
               break;
            case 'lastName':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 3 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only characters. No digits";
                    return errorsText + type['regexError'];
                }
                break;
            case 'email':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 6 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must match format a@a.ro";
                    return errorsText + type['regexError'];
                }
                break;
            case 'password':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 7 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " Pdon't match with the requested characters";
                    return errorsText + type['regexError'];
                }
                break;
            case 'retypePassword':
                if(errorType === 'passNoMatch'){
                    return type['passNoMatch'] = " Passwords no match";
                }
                break;
            case 'username':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 3 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only letters, numbers , underscores and period. Must start with a  letter ";
                    return errorsText + type['regexError'];
                }
                break;
            case 'selectCountry':
                if(errorType === 'selectError'){
                    type['selectError'] = "Select a country";
                    return  type['selectError'];
                }
                break;
            case 'selectDay':
                if(errorType === 'selectError'){
                    type['selectError'] = "Select a day";
                    return  type['selectError'];
                }
                break;
            case 'selectMonth':
                if(errorType === 'selectError'){
                    type['selectError'] = "Select a month";
                    return  type['selectError'];
                }
                break;
            case 'selectYear':
                if(errorType === 'selectError'){
                    type['selectError'] = "Select a month";
                    return  type['selectError'];
                }
                break;
            case 'address':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 6 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only letters, numbers";
                    return errorsText + type['regexError'];
                }
                break;
            case 'city':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 6 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only letters, numbers";
                    return errorsText + type['regexError'];
                }
                break;
            case 'postalCode':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 6 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only numbers";
                    return errorsText + type['regexError'];
                }
                break;
            case 'mobile':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 10 digits";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only numbers";
                    return errorsText + type['regexError'];
                }
                break;
            case 'question':
                if(errorType === 'lengthError'){
                    type['lengthError'] = " must be at least 2 char";
                    return errorsText + type['lengthError'];
                }
                if(errorType === 'regexError'){
                    type['regexError'] = " must contain only  char";
                    return errorsText + type['regexError'];
                }
                break;
            case 'chooseQuestion':
                if(errorType === 'radioError'){
                type['radioError'] = "Select a question";
                return  type['radioError'];
            }
                break;
            case 'termsConditions':
                if(errorType === 'checkError'){
                    type['radioError'] = "Please confirm you have 18 years old";
                    return  type['radioError'];
                }
                break;
        }
    }
    lengthError(inputName, noChar){
        console.log(inputName, this.state.registerFields[inputName].length);
        if (this.state.registerFields[inputName].length < noChar) {
            this.state.registerFields.errors[inputName] =
                this.errorsText(inputName,'lengthError');
            return true;
        }
        return false
    }
    regexError(inputName,regex){
        let toMatch = '`' + this.state.registerFields[inputName] + '`';
        let m;
        if ((m = regex.exec(toMatch)) !== null) {
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
            });
        } else {
            this.state.registerFields.errors[inputName] = this.errorsText(inputName,'regexError')
        }
    }
    passMatchError(inputName){
        if(inputName === 'retypePassword'){
            if(this.state.registerFields.password !== this.state.registerFields.retypePassword ){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'passNoMatch');
            }
        }
    }

    valid( inputName, regex, noChar ){
        this.state.registerFields[inputName].trim();
        if(regex === false){
            if(inputName === 'selectCountry' && ( this.state.registerFields[inputName] === 'Select a country' || this.state.registerFields[inputName] === ' ' )){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'selectError');
            }
            if(inputName === 'selectDay' && ( this.state.registerFields[inputName] === 'Day' || this.state.registerFields[inputName] === ' ' )){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'selectError');
            }
            if(inputName === 'selectMonth' && ( this.state.registerFields[inputName] === 'Month' || this.state.registerFields[inputName] === ' ' )){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'selectError');
            }
            if(inputName === 'selectYear' && ( this.state.registerFields[inputName] === 'Year' || this.state.registerFields[inputName] === ' ' )){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'selectError');
            }
            if(inputName === 'chooseQuestion' && ( this.state.registerFields[inputName] === false || this.state.registerFields[inputName] === ' ' )){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'radioError');
            }
            if(inputName === 'termsConditions' && ( this.state.registerFields[inputName] === false || this.state.registerFields[inputName] === ' ' )){
                this.state.registerFields.errors[inputName] = this.errorsText(inputName,'checkError');
            }
        }else{
            if( this.lengthError(inputName, noChar) === false ) {
                this.regexError(inputName, regex);
            }
        }
        this.passMatchError(inputName);
    }

    handleError(inputName, regex, noChar){
        for(let stateIndex in this.state.registerFields) {
            if(this.state.registerFields.hasOwnProperty(stateIndex)){
                if((typeof inputName === 'string') === ( typeof stateIndex === 'string')){
                    /*console.log(stateIndex);*/
                    /* switch (inputName) {
                     case 'firstName':
                     case 'lastName':
                     case 'email':
                     case 'password':
                     case 'retypePassword':
                     case 'username':
                     case 'selectCountry':
                     case 'selectDay':
                     case 'selectMonth':
                     case 'selectYear':
                     case 'address':
                     case 'city':
                     case 'postalCode':
                     case 'mobile':
                     case 'question':
                     case 'chooseQuestion':
                     case 'termsConditions':
                     this.valid(inputName,regex,noChar);
                     break;
                     }*/
                    this.valid(inputName,regex,noChar);
                    return false;
                    break;
                }
            }
        }
    }

    userFormIsValid(){
        var formIsValid = true;
        this.state.registerFields.errors = { };

        /*PERSONAL INFO*/
        let firstNameRegex = /\b(?=.*?[A-Za-z])(?=.*?[a-z]).{3,}\b/;
        this.handleError('firstName',firstNameRegex,3);

        let lastNameRegex = /\b(?=.*?[A-Za-z])(?=.*?[a-z]).{3,}\b/;
        this.handleError('lastName',lastNameRegex,3);

        let emailRegex =  /\b([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+\b/;
        this.handleError('email',emailRegex,6);

        /*select*/
        this.handleError('selectDay', false);
        this.handleError('selectMonth', false);
        this.handleError('selectYear', false);
        /*end select*/
        let mobileRegex = /\b(?=.*?[0-9]).{10,}\b/;
        this.handleError('mobile',mobileRegex,10);

        /*ADDRESS INFO*/
        /*select*/
        this.handleError('selectCountry', false);
        /*end select*/
        this.handleError('address', usernameRegex,6);
        this.handleError('city', usernameRegex,6);
        let postalRegex = /\b(?=.*?[0-9]).{6,}\b/;
        this.handleError('postalCode', postalRegex,6);

        /*ACCOUNT INFO*/
        let usernameRegex = /\b(?=.*?[A-Za-z])(?=.*?[a-z]).{3,}\b/;
        this.handleError('username',usernameRegex,3);

        let passRegex = /\b(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}\b/;
        this.handleError('password',passRegex,7);
        this.handleError('retypePassword',passRegex,7);

        let questionRegex = /\b(\w+)\b/;
        this.handleError('question', questionRegex,2);
        this.handleError( 'chooseQuestion', false );

        /*TERMS&CONDITIONS*/
        this.handleError( 'termsConditions', false );

        this.setState({errors: this.state.registerFields.errors});
        if(Object.keys(this.state.registerFields.errors).length !== 0 ){
             formIsValid = false
        }
        return formIsValid;
    }

    pushAdd(e){
        e.preventDefault();
        if(this.userFormIsValid()) {
            this.props.itemStored.push({
                firstName: this.state.registerFields.firstName,
                lastName: this.state.registerFields.lastName,
                email: this.state.registerFields.email,
                password: this.state.registerFields.password,
                retypePassword: this.state.registerFields.retypePassword,
                username: this.state.registerFields.username,
                selectDay: this.state.registerFields.selectDay,
                selectMonth: this.state.registerFields.selectMonth,
                selectYear: this.state.registerFields.selectYear,
                selectMobilePrefix: this.state.registerFields.selectMobilePrefix,
                mobile: this.state.registerFields.mobile,
                selectCountry: this.state.registerFields.selectCountry,
                address: this.state.registerFields.address,
                city: this.state.registerFields.city,
                postalCode: this.state.registerFields.postalCode,
                currency: this.state.registerFields.currency,
                chooseQuestion: this.state.registerFields.chooseQuestion,
                question: this.state.registerFields.question,
                termsConditions: this.state.registerFields.termsConditions,

            });
            console.log('Te-ai inregistrat cu succes. In scurt timp ve-i fi redirectionat catre casino.')
            browserHistory.push('/casino');
        }
        return;
    }

    selectNo( min,max, optionsText ){
        let temp = [];
        for(let i = min; i<= max; i++){
            if(typeof optionsText !== 'undefined'){
                temp.push( <option  key={ i } value={i}> { optionsText[i] } </option> )
            }else {
                temp.push(<option key={ i } value={i}> { i } </option>);
            }
        }
        return temp
    }
    handleMobileCode(countryS){
        return(
            countryS.map(country =>
                <option  key={ country.alpha2Code } value={country.name}> {'+  ' + country.callingCodes } </option> )
        )
    }
    handleCurrencyeCode(countryS){
        return(
            countryS.map(country =>
                <option  key={ country.alpha2Code } value={country.name}> {  country.currencies.map(item => item.code )} </option> )
        )
    }

    render(){
        return(
            <form className="Form" >
                <div className="Col-3">
                <h2>PERSONAL INFO </h2>
                    <Input
                        tye='text'
                        name="firstName"
                        label="FirstName"
                        value = { this.props.firstName }
                        placeholder = 'Insert first name'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.firstName }
                        autoComplete='on'
                        title='First name'
                        requierd={ true }
                    />
                    <Input
                        type="text"
                        name="lastName"
                        label="LastName"
                        value = { this.props.lastName }
                        placeholder = 'Insert last name'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.lastName }
                        title='Last name'
                        requierd={ true }
                    />
                    <Input
                        type='email'
                        name="email"
                        label="Email"
                        value = { this.props.email }
                        placeholder = 'Insert email'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.email }
                        title='Email '
                        requierd={ true }
                    />
                    <div className="DOB">
                        <span className="DOBNAME">Select date of birth</span>
                        <Select
                            name = 'selectDay'
                            value = "select"
                            onChange = { this.handleChange }
                            options = { this.selectNo(1,31) }
                            selectText = 'Day'
                            requierd = { true }
                            error = { this.state.registerFields.errors.selectDay }
                        />
                        <Select
                            name = 'selectMonth'
                            value = "select"
                            onChange = { this.handleChange }
                            options = { this.selectNo(0,11,this.state.registerFields.months)  }
                            selectText = 'Month'
                            requierd = { true }
                            error = { this.state.registerFields.errors.selectMonth }
                        />
                        <Select
                            name = 'selectYear'
                            value = "select"
                            onChange = { this.handleChange }
                            options = { this.selectNo(1900,(new Date().getFullYear())) }
                            selectText = 'Year'
                            requierd = { true }
                            error = { this.state.registerFields.errors.selectYear }

                        />
                    </div>
                    <div className="Mobile">
                        <span className="Mobile">Select mobile:</span>
                        <Select
                            title='Mobile cod'
                            name = "selectMobilePrefix"
                            value = "select"
                            onChange = { this.handleChange }
                            options = { this.handleMobileCode(this.props.countryS) }
                            selectText = 'Mobile'
                            requierd = { true }
                        />
                        <Input
                            type="text"
                            name="mobile"
                            placeholder = 'Insert mobile no.'
                            onChange = { this.handleChange }
                            title='Mobile'
                            requierd={ true }
                            error= { this.state.registerFields.errors.mobile }
                        />
                    </div>
                </div>
                <div className="Col-3">
                    <h2>ADDRESS INFO </h2>
                    <Select
                        name = 'selectCountry'
                        label = "Select a country"
                        value = 'select'
                        onChange = { this.handleChange }
                        options = { this.handleOptions(this.props.countryS) }
                        selectText = 'Select a country'
                        requierd = { true }
                        error = { this.state.registerFields.errors.selectCountry }
                    />
                    <Input
                        tye='text'
                        name="address"
                        label="Address"
                        value = { this.props.address }
                        placeholder = 'Insert address'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.address }
                        autoComplete='on'
                        title='Address'
                        requierd={ true }
                    />
                    <Input
                        tye='city'
                        name="city"
                        label="City"
                        value = { this.props.city }
                        placeholder = 'Insert city'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.city }
                        autoComplete='on'
                        title='City'
                        requierd={ true }
                    />
                    <Input
                        tye='postal'
                        name="postalCode"
                        label="Postal code"
                        value = { this.props.postalCode }
                        placeholder = 'Insert postal code'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.postalCode }
                        autoComplete='on'
                        title='Postal code'
                        requierd={ true }
                    />
                </div>
                <div className="Col-3">
                    <h2>ACCOUNT INFO </h2>
                    <Input
                        type='text'
                        name="username"
                        label="Username"
                        value = { this.props.username }
                        placeholder = 'Insert username'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.username }
                        title='username '
                        requierd={ true }
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        value = { this.props.password }
                        placeholder = 'Insert password'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.password }
                        title='Password '
                        requierd={ true }
                    />
                    <div className="SpecialLabel">Password must have at least 7 characters, and must contain uppercase, lowercase, numbers and special characters.</div>
                    <Input
                        type="password"
                        name="retypePassword"
                        label="Retype Password"
                        value = { this.props.retypePassword }
                        placeholder = 'Insert password'
                        onChange = { this.handleChange }
                        error = { this.state.registerFields.errors.retypePassword }
                        title='Retype Password'
                        requierd={ true }
                    />
                    <Select
                        name = "currency"
                        value = { this.props.currency }
                        onChange = { this.handleChange }
                        options = { this.handleCurrencyeCode(this.props.countryS) }
                        selectText = 'Currency'
                        requierd = { false }
                    />
                    <br/>
                    <h3>Choose a security question:</h3>
                    <Input
                        type="radio"
                        name="chooseQuestion"
                        label="What is your favorite team ?"
                        value = 'teamQuestion'
                        onChange = { this.handleChange }
                        title='Choose question'
                        requierd= { true }
                        defaultChecked = { false }
                    />
                    <Input
                        type="radio"
                        name="chooseQuestion"
                        label="What is your mother name?"
                        value = 'nameQuestion'
                        onChange = { this.handleChange }
                        title='Choose question'
                        requierd={ true }
                        defaultChecked = { false }
                    />
                    <Input
                        type="radio"
                        name="chooseQuestion"
                        label="What is your favorite color?"
                        value = 'colorQuestion'
                        onChange = { this.handleChange }
                        title='Choose question'
                        requierd={ true }
                        defaultChecked = { false }
                        error = { this.state.registerFields.errors.chooseQuestion }
                    />
                    <Input
                        type='text'
                        name="question"
                        label="Answer"
                        value = { this.props.question }
                        placeholder = 'Insert answer'
                        onChange = { this.handleChange }
                        title='answer'
                        error = { this.state.registerFields.errors.question }
                    />
                </div>
                <div className="Col-1">
                    <Input
                        type="checkbox"
                        name="E-mail"
                        label="Yes, please send me exclusive offers by e-mail. "
                        value = 'terms'
                        onChange = { this.handleChange }
                        title='Check terms and conditions'
                        requierd={ true }
                        defaultChecked = { true }
                    />
                    <Input
                        type="checkbox"
                        name="SMS"
                        label="Yes, please send me exclusive offers by SMS.  "
                        value = 'terms'
                        onChange = { this.handleChange }
                        title='Check terms and conditions'
                        requierd={ true }
                        defaultChecked = { true }
                    />
                    <Input
                        type="checkbox"
                        name="termsConditions"
                        label="I confirm that I am 18 years or older and have read and accept T&C"
                        value = "termsConditions"
                        onChange = { this.handleChange }
                        title='Check terms and conditions'
                        requierd={ true }
                        defaultChecked = { false }
                        error = { this.state.registerFields.errors.termsConditions }
                    />
                </div>
                <input className='Register' type="submit" name='addButton' value='Submit' onClick={ (e) => { this.pushAdd(e) } } />
            </form>

        )
    }
}

function mapStateToProps(state){
    return {
        countryS: state.country
    }
}
export default connect(mapStateToProps,actions)(Register);