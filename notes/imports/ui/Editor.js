import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

import {Notes} from '../api/notes';

export class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title : "",
            body : ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title : this.props.note.title,
                body : this.props.note.body
            })
        }
    }

    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({body});
        e.preventDefault();
        this.props.call('notes.update', this.props.note._id, {body});
    }

    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({title});
        e.preventDefault();
        this.props.call('notes.update', this.props.note._id, {title});
    }

    handleDeleteClick() {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }

    render() {


        if (this.props.note) {
            return (
                <div>
                    <input placeholder="Untitled note"
                           onChange={this.handleTitleChange.bind(this)}
                           value={this.state.title}/>
                    <textarea onChange={this.handleBodyChange.bind(this)}
                              value={this.state.body}
                              placeholder="Your note here"/>
                    <button onClick={this.handleDeleteClick.bind(this)}>Delete Note</button>
                </div>
            )
        } else {
            return (
                <p>{this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started'}</p>
            )
        }
    }
}

Editor.ptopTypes = {
    note : React.PropTypes.object,
    selectedNoteId : React.PropTypes.string,
    call: React.PropTypes.func.isRequired,
    browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(()=> {
    const selectedNoteId = Session.get("selectedNoteId");
    return {
        selectedNoteId,
        note : Notes.findOne(selectedNoteId),
        call : Meteor.call
    }
}, Editor);




