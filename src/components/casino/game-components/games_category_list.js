import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as actionsCreators from '../../../actions';
import { fetchCat, activeCat } from '../../../actions/index';

class GamesCategoryList extends Component {
    componentWillMount() {
        this.props.fetchCat();
    }
    /*renderGameCategoryList(cat){
        console.log( cat );
        return (
            <li className = 'GamesCategoryListItem'
                key={ cat.id }
                onClick = { () => console.log(this.props.activeCat(cat) ) }
            >
                { cat.localizedName }

            </li>
        )
    }*/
    randerList(){
        return this.props.categories.map(
            (cat) => {
                return (
                    <li className = 'GamesCategoryListItem'
                        key={ cat.id }
                        onClick = { () => this.props.test(cat) }
                    >
                        <a href="#">{ cat.localizedName }</a>
                    </li>
                )
            }
        )
    }
    render(){
            if( this.props.categories ){
                return (
                <nav className = 'GamesCategoryNav' >
                    <ul className = 'GamesCategoryList'>
                        { this.randerList()}
                    </ul>
                </nav>
                )
            }
            return <div> no data loading... </div>
    }

}

function mapStateToProps(state){
    return {
        categories: state.categories
    }
}

function mapDispatchToProp(dispatch){
    return bindActionCreators(
        { test: activeCat , fetchCat }, dispatch
    )
}

export default connect( mapStateToProps, mapDispatchToProp )(GamesCategoryList);