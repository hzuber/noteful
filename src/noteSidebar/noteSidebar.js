import React from 'react';
import './noteSidebar.css';
import NOTES from '../noteStore/noteStore.js';

export default function NoteSideBar (props){
    const note = NOTES.notes.find(note =>
        note.id === props.match.params.noteId);
    const folder = NOTES.folders.find(folder =>
        folder.id === note.folderId)
    return (
        <div className="sidebar-container">
            <ul>
                <li>{folder.name}</li>
            </ul>
        </div>
    )    
}