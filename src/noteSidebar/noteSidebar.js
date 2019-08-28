import React, { Component } from 'react';
import './noteSidebar.css';
import NotefulContext from '../notefulContext';

export default function NoteSideBar(props) {
        const { notes } = this.context;
        const { folders } = this.context;
        const note = notes.find(note =>
            note.id === props.match.params.noteId);
        const folder = folders.find(folder =>
            folder.id === note.folderId)
        return (
            <NotefulContext.Consumer>
                {(context)}
            <div className="sidebar-container">
                <ul className="folder-list">
                    <li className="selected-folder">{folder.name}</li>
                </ul>
            </div>
            </NotefulContext.Consumer>
        )
}
