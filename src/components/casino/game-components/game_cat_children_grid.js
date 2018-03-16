import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { activeGame } from '../../../actions/index';
import GameDetail from './game_detail';

class GamesCatChildrenGrid extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemId: null,
            gamePopularity: []
        };

    }

    renderAllCatTitle( ){
        return(
            <h3 className="GameCatTitle">
                <span>
                    { this.props.categories[this.props.categories.length-1].localizedName }
                </span>
                <span className="GamesNo">
                    { this.props.categories[this.props.categories.length-1].children.length }
                </span>
            </h3>
        )
    }
    renderCatTitle(){
        return(
            <h3>
                <span>
                    { this.props.test2.localizedName }
                </span>
                <span className="GamesNo">
                    { this.props.test2.children.length }
                </span>
            </h3>
        )
    }

    handleClick(e, item){
        e.preventDefault();
        this.setState(
            { itemId: item.id }
        );
        if(typeof this.props.activeGame === 'function'){
            this.props.activeGame(item) ;
        }
    }

    randerNewGame(item){
        if(item.game.newGame === false){
            return ( null )
        }
        return (
            <span className="NEW"> NEW </span>
        )
    }

    randerPopularity(item){
        if( Object.prototype.toString.call(this.state.gamePopularity) === '[object Array]' ) {
            this.state.gamePopularity.push(item.game.popularity);
            let max = Math.max(...this.state.gamePopularity);
            let startsWidth = (item.game.popularity * 20 / max).toFixed(2);

            let STYLE;
            ( startsWidth <= 1 ) ? STYLE = { width: 200 } : STYLE = { width: 200 - startsWidth * 5};

            return (
                <div className='StarsBox'>
                    <div className='StarOverlay' style= { STYLE }></div>
                    <div className='StarWrapper'  >
                        <span className='StarItem'> &#9733; </span>
                        <span className='StarItem'> &#9733; </span>
                        <span className='StarItem'> &#9733; </span>
                        <span className='StarItem'> &#9733; </span>
                        <span className='StarItem'> &#9733; </span>
                    </div>
                </div>
            )
        }
    }
    randerAllGameThumbnails(){
        return (
            <div>
                {
                    this.props.categories[this.props.categories.length - 1].children.map((item) => {
                        return (
                            <div calssName="GameWrapper" >
                                <div className="GameThumbnail"
                                     key= { item.id }
                                     href="#"
                                     onClick={(e) => this.handleClick(e, item) }
                                >
                                    <span className="GameVendor">
                                        { item.game.vendor }
                                    </span>
                                    <div >
                                        <img className="GameImage"
                                             width="200"
                                             height="200"
                                             src={ item.game.thumbnail }
                                        />
                                    { this.randerPopularity(item) }
                                    <span className="GameName">{ item.game.name }</span>
                                    { this.randerNewGame(item) }
                                    </div>
                                    { this.state.itemId === item.id ? <GameDetail /> : null }
                                </div>

                            </div>
                        );
                    }) }
           </div>
        )
    }
    randerCatGameThumbnails(){
        return (
            this.props.test2.children.map((item) => {
                switch( item.type ) {
                    //casino games
                    case 'game' :
                        return (
                            <div calssName="GameWrapper" >
                                <div className="GameThumbnail"
                                     key={ item.id }
                                     onClick={(e) => this.handleClick(e, item)}
                                     onMouseOver={ () => { }}
                                >
                                        <span className="GameVendor">
                                            { item.game.vendor }
                                        </span>
                                        <div >
                                            <img className="GameImage"
                                                 width="200"
                                                 height="200"
                                                 src={ item.game.thumbnail }
                                            />
                                        <span className="GameName">
                                            { item.game.name }
                                        </span>
                                            { this.randerNewGame(item) }
                                        </div>
                                        { this.state.itemId === item.id ? <GameDetail /> : null }
                                </div>
                            </div>
                        );
                    //live casino games
                    case 'table' :
                        return (
                            <div className="GameThumbnail"
                                 key={ item.id }
                                 onClick={ () => this.props.activeGame(item)}
                                 onMouseOver={ () => { }}
                            >
                                <div >
                                    <img className="GameImage"
                                         width="200"
                                         height="200"
                                         src={ item.table.thumbnail }
                                    />
                                    <span className="GameName">{ item.table.name }</span>
                                </div>
                            </div>
                        );
                }
            })
        )
    }

    render(){
            if(this.props.test2){
                return (
                    <div className="GameGrid">
                        <div>
                            { this.renderCatTitle() }
                            { this.randerCatGameThumbnails() }
                        </div>
                    </div>
                )
            }
            return (
                <div className="GameGrid All">
                        <div>
                            { this.renderAllCatTitle() }
                            { this.randerAllGameThumbnails() }
                        </div>
                </div>
            )
    }
}

function mapStateToProps(state){
    return {
        test2: state.activeCat,
        categories: state.categories
    }
}

function mapDispatchToProp(dispatch){
    return bindActionCreators(
        { activeGame: activeGame }, dispatch
    )
}

export default connect( mapStateToProps, mapDispatchToProp )( GamesCatChildrenGrid );