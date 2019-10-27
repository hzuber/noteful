import React, { Component } from 'react';
import './noteSidebar.css';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../notefulContext';

export default class NoteSideBar extends Component {
    
    static defaultProps ={
        deleteNote: () => {},
        match: {
            params:{}
        }
    }
    static contextType = NotefulContext


    render() {
        const { notes } = this.context;
        const { folders } = this.context;
        console.log(notes, folders)
        const note = notes.find(note =>
            note.id === Number(this.props.match.params.note_id));
            console.log(note)
        const folder = folders.find(folder =>
            folder.id === note.folder_id)
            console.log(folder)
        return (
            <div className="sidebar-container">
                <ul className="folder-list">
                    <li className="selected-folder">
                        <NavLink
                            to={`/folder/${folder.id}`}
                            style={{ textDecoration: 'none' }}
                            activeClassName="activeNavLink"
                            className="selected-folder-NavLink">
                            {folder.name}
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
