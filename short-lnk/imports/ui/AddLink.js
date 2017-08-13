import React from "react";
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url : '',
            isOpen : false,
            error : ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const {url} = this.state;
        if (url) {
            Meteor.call('links.insert', url, (err, res) => {
                if (!err) {
                    this.handleModalClose();
                } else {
                    this.setState({error : err.reason});
                }
            });
        }
    }

    onChange(e) {
        this.setState({url : e.target.value.trim()});
    }

    handleModalClose() {
        this.setState({
            isOpen : false,
            url : '',
            error : ""
        });
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ isOpen: true }) }>+ Add Link</button>
                <Modal
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link">
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : ''}
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input
                            onChange={this.onChange.bind(this)}
                            type="text"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}/>
                        <button>Add Link</button>
                        <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}