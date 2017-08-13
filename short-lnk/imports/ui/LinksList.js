import React from 'react';
import {Tracker} from 'meteor/tracker'
import {Meteor} from 'meteor/meteor'
import {Links} from '../api/links';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

import LinkListItem from './LinkListItem';

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
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        if(this.state.links.length === 0){
            return <div className="item">
                <p className="item__status-message">No links found</p>
            </div>
        }

        return this.state.links.map((link)=> {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinkListItem  key={link._id} shortUrl={shortUrl} {...link}/>;
        })
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        )
    }
}