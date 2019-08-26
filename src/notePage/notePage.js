import React, {Component} from 'react';
import NOTES from '../noteStore/noteStore.js';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import './notePage.css';

class NotePage extends Component{
    render() {
    const note = 
        NOTES.notes.find(note =>
        note.id === this.props.match.params.noteId);
    
    return (
        <article className="Note">
            <header>
                <button 
                    className="go-back-btn"
                    onClick = {this.props.onGoBack}>
                    Go Back
                </button>
                <h3>{note.name}</h3>
                <p>Modified on &nbsp;
                    <Moment format = "LL">
                       {note.modified}
                    </Moment>
                </p>
                <button className='delete-btn'>
                    Delete
                </button>
            </header>
            <p className='note-content'>{note.content}</p>
        </article>
    )
}}

export default withRouter(NotePage);