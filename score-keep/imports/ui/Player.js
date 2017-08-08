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
        return (
            <p>
                {this.props.player.name} has {this.props.player.score} point(s)
                <button onClick={this.incrementHandler.bind(this)}>+1</button>
                <button onClick={this.decrementHandler.bind(this)}>-1</button>
                <button onClick={this.deleteHandler.bind(this)}>x</button>
            </p>
        )
    }
}

Player.propTypes = {
    player : React.PropTypes.object.isRequired
};