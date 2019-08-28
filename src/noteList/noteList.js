import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './noteList.css';
import NotefulContext from '../notefulContext';

export default class NoteList extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {
        const { notes } = this.context;
        const noteList = this.props.match.params.folderId ?
            notes.filter(note =>
                note.folderId === this.props.match.params.folderId) :
            notes;
        const orderedNoteList = noteList.sort((note1, note2) =>
        note1.modified < note2.modified ? 1 : -1
    )
        return (
            <>
                <ul className="note-list">
                    {orderedNoteList.map((note) =>
                        <Link
                            key={note.id}
                            to={`/note/${note.id}`}
                            style={{ textDecoration: 'none' }}>
                            <li className="note">
                                <h4>{note.name}</h4>
                                <p>Modified on&nbsp;
                                <Moment format="LL">
                                        {note.modified}
                                    </Moment>
                                </p>
                            </li>
                        </ Link>
                    )}
                    <button className="add-note-btn note">
                        Add note
                </button>
                </ul>
            </>
        )
    }
}