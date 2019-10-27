import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './noteList.css';
import NotefulContext from '../notefulContext';
import PropTypes from 'prop-types';

export default class NoteList extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;
    render() {
        const { notes } = this.context;
        const noteList = this.props.match.params.folder_id ?
            notes.filter(note =>
                note.folder_id === Number(this.props.match.params.folder_id)) :
            notes;
        const orderedNoteList = noteList.sort((note1, note2) =>
            note1.date_modified < note2.date_modified ? 1 : -1)
        const addNote = this.props.match.params.folder_id ? 
            (
            <li>
                <Link 
                    to={`/folder/${this.props.match.params.folder_id}/addNote`}
                    style={{ textDecoration: 'none' }}
                    className="note-Link">
                    <button className="add-note-btn note">
                    Add note
                    </button>
                </Link>
            </li>
            ) 
            : (
            <li>
                <Link 
                    to='/addNote'
                    style={{ textDecoration: 'none' }}
                    className="note-Link">
                    <button className="add-note-btn note">
                    Add note
                    </button>
                </Link>
            </li>
            );
        return (
            <>
                <ul className="note-list">
                    {orderedNoteList.map((note) =>
                        <li className="note"
                            key={note.id}>
                            <Link
                                to={`/note/${note.id}`}
                                style={{ textDecoration: 'none' }}
                                className="note-Link">
                                <h4>{note.name}</h4>
                                <p>Modified on&nbsp;
                                <Moment format="LL">
                                    {note.date_modified}
                                </Moment>
                                </p>
                            </ Link> 
                        </li>
                    )}
                    {addNote}
                </ul>
            </>
        )
    }
}


NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    }))
}