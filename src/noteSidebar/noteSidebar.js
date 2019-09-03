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
        console.log('noteSidebar rendering')
        const { notes } = this.context;
        const { folders } = this.context;
        const note = notes.find(note =>
            note.id === this.props.match.params.noteId);
        const folder = folders.find(folder =>
            folder.id === note.folderId)
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
