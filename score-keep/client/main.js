import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players, calculatePlayerPosition} from "./../imports/api/players";
import App from "./../imports/ui/App";


Meteor.startup(() => {

    Tracker.autorun(() => {
        const title = "Score Keep";
        const players = Players.find({}, {
            sort: {
                score: -1
            }
        }).fetch();

        const positionedPlayer = calculatePlayerPosition(players);
        ReactDOM.render(<App title={title} players={positionedPlayer}/>, document.getElementById('app'))
    });
});
