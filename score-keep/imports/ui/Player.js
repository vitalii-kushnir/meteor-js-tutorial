import React from 'react';
import {Players} from "./../api/players";

export default class Player extends React.Component {

    deleteHandler() {
        Players.remove({_id : this.props.player._id})
    }

    incrementHandler() {
        Players.update({
            _id : this.props.player._id
        }, {
            $inc : {score : 1}
        })
    }

    decrementHandler() {
        Players.update({
            _id : this.props.player._id
        }, {
            $inc : {score : -1}
        })
    }

    render() {
        const itemClassName = `item item--position-${this.props.player.rank}`;
        return (
            <div className={itemClassName}>
                <div className="player">
                    <div>
                        <h3 className="player__name">{this.props.player.name}</h3>
                        <p className="player__stats">
                            {this.props.player.position} place - {this.props.player.score} point(s)
                        </p>
                    </div>
                    <div className="player__actions">
                        <button className="button button--round" onClick={this.incrementHandler.bind(this)}>+1</button>
                        <button className="button button--round" onClick={this.decrementHandler.bind(this)}>-1</button>
                        <button className="button button--round" onClick={this.deleteHandler.bind(this)}>x</button>
                    </div>
                </div>
            </div>
        )
    }
}

Player.propTypes = {
    player : React.PropTypes.object.isRequired
};