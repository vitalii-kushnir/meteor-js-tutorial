import React from 'react';
import {Tracker} from 'meteor/tracker'
import {Meteor} from 'meteor/meteor'
import {Links} from '../api/links';

export default class LinksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links : []
        }
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(()=> {
            Meteor.subscribe('links');
            const links = Links.find().fetch();
            this.setState({links});
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        return this.state.links.map((link)=> {
            return <p>{link.url}</p>;
        })
    }

    render() {
        return (
            <div>
                <p>Links List</p>
                <div>{this.renderLinksListItems()}</div>
            </div>
        )
    }
}