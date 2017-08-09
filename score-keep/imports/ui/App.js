import React from 'react';
import ReactDOM from 'react-dom';

import AddPlayer from "./AddPLayer";
import PlayerList from "./PlayerList";
import TitleBar from "./TitleBar";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <TitleBar title={this.props.title} subtitle="Created by Vitalii"/>
                <div className="wrapper">
                    <PlayerList players={this.props.players}/>
                    <AddPlayer />
                </div>
            </div>
        )
    }
}

App.propTypes = {
    title : React.PropTypes.string.isRequired,
    players : React.PropTypes.array.isRequired
};