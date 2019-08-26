import React from 'react';
import NOTES from '../noteStore/noteStore';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

export default function NoteList(props){
    const notes= props.match.params.folderId ?
        NOTES.notes.filter(note =>
        note.folderId === props.match.params.folderId) :
        NOTES.notes;
    return(
        <>
            <ul className="note-list">
                {notes.map((note)=>
                    <Link to = {`/note/${note.id}`}>
                        <li key={note.id}>
                            <h4>{note.name}</h4>
                            <p>Modified on &nbsp;
                                <Moment format = "LL">
                                    {note.modified}
                                </Moment>
                            </p>
                        </li>
                    </ Link>
                )}
                <button className="add-note-btn">
                    Add note
                </button>
            </ul>
        </>
    )
}