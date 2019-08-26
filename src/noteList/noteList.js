import React from 'react';
import NOTES from '../noteStore/noteStore';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './noteList.css';

export default function NoteList(props) {
    const notes = props.match.params.folderId ?
        NOTES.notes.filter(note =>
            note.folderId === props.match.params.folderId) :
        NOTES.notes;
    return (
        <>
            <ul className="note-list">
                {notes.sort((note1, note2) =>
                    note1.modified < note2.modified ? 1 : -1
                ).map((note) =>
                    <Link
                        to={`/note/${note.id}`}
                        style={{ textDecoration: 'none' }}>
                        <li key={note.id} className="note">
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