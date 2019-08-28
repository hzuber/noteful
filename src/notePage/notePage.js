import React, { Component } from 'react';
import Moment from 'react-moment';
import './notePage.css';
import NotefulContext from '../notefulContext.js';

class NotePage extends Component {
    static defaultProps ={
        deleteNote: () => {},
        match: {
            params:{}
        }
    }
    static contextType = NotefulContext

    deleteNoteRequest() {
        const {notes=[]} = this.context;
        const note = notes.find(
            note => note.id === this.props.match.params.noteId);
        fetch(`http://localhost:9090/notes/${note.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(error => {
                            throw error
                        })
                }
                return res.json()
            })
            .then(() => {
                this.context.deleteNote(note.id);
                this.props.history.goBack();
            })
            .catch(error => {
                console.error(error)
            })
    }
    
    render() {
        const {notes=[]} = this.context;
        console.log(notes);
        const note = notes.find(
            note => note.id === this.props.match.params.noteId);
        console.log(note);
        return (
            <article className="Note">
                <header className="note-header">
                    <button
                        className="go-back-btn"
                        onClick={() => this.props.history.goBack()}>
                        Go Back
                    </button>
                    <div className="note-header-text">
                        <h3>{note.name}</h3>
                        <p>Modified on &nbsp;
                                    <Moment format="LL">
                                {note.modified}
                            </Moment>
                        </p>
                    </div>
                    <button
                        className='delete-btn'
                        onClick={() => this.deleteNoteRequest()}>
                        Delete
                    </button>
                </header>
                <p className='note-content'>{note.content}</p>
            </article>
        )
    }
}

export default NotePage;