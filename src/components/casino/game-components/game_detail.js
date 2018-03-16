import React, { Component } from 'react';
import { connect } from 'react-redux';


class GameDetail extends Component {
    constructor(props){
        super(props);
        this.state = { closeItem: null };
    }

    handleClose(){
        this.setState(
            { closeItem: this.props.activeGame }
        );
    }

    handleHrefOnClick(e) {
        e.preventDefault();
        window.open(this.props.activeGame.game.url, '_blank')
    }

    renderCloseButton(){
        return(
            <button className="CloseButton" onClick= {() => this.handleClose()}>&times;</button>
        )
    }
    renderGameDetail(){
        let STYLE = {
            background: 'url(' + this.props.activeGame.game.backgroundImage + ' ) center center/ 100% 100% no-repeat '
        };
        return(
            <div className="GameThumbnailDetail">
                <img className="GameThumbnailDetailImg"
                     width= '150'
                     height='150'
                     src = { this.props.activeGame.game.thumbnail }
                />
                <div className="ActionWrapper" style={ STYLE }>
                    <button className="Button PlayForFun"
                       title= { 'Play ' + this.props.activeGame.game.name + ' for fun' }
                       onClick = { (e) => { this.handleHrefOnClick(e) } }
                    >
                       PLAY FOR FUN
                    </button>
                    <button className="Button PlayForReal"
                       title={ 'Play ' + this.props.activeGame.game.name + ' for real'}
                        /*TO DO: redirect to register*/
                    >
                        PLAY FOR REAL
                    </button>
                </div>
                <div className="GameThumbnailDetailDescription">
                    <h3 className="GameThumbnailDetailName">
                        { this.props.activeGame.game.name }
                    </h3>
                    <p> Small description: </p>
                    <p className="GameThumbnailDetailDescription">
                        { this.props.activeGame.game.description }
                    </p>
                </div>
            </div>
        )
    }

    render() {
        if ( this.props.activeGame && this.state.closeItem === null ) {
               return(
                       <div className="GameDetailWrapper">
                            { this.renderCloseButton() }
                            { this.renderGameDetail() }
                       </div>
                    )
                }
        return null;
    }
}
function mapStateToProp(state){
    return{
        activeGame: state.activeGame
    }

}
export default connect(mapStateToProp)(GameDetail);
