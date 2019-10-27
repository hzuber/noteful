import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import NotefulContext from '../notefulContext';

export default class SideBar extends Component {
    static contextType = NotefulContext;

    render() {
        const { folders } = this.context
        const { notes } = this.context
        const noteId = this.props.match.params.note_id
        const note = notes.find(note => note.id == noteId)
        const folderList = noteId ? folders.find(folder => folder.id == note.folder_id) : folders;
        return (
            <div className="sidebar-container">
                <ul className="folder-list">
                    {folderList.length > 1 ? folderList.map(folder =>
                        <li
                            key={folder.id}
                            className="folder">
                            <NavLink
                                to={`/folder/${folder.id}`}
                                style={{ textDecoration: 'none' }}
                                activeClassName="activeNavLink"
                                className="folder-NavLink">
                                {folder.name}
                            </NavLink>
                        </li>
                    ) :
                        <li
                            key={folderList.id}
                            className="folder">
                            <NavLink
                                to={`/folder/${folderList.id}`}
                                style={{ textDecoration: 'none' }}
                                activeClassName="activeNavLink"
                                className="folder-NavLink">
                                {folderList.name}
                            </NavLink>
                        </li>
                    }
                    <li className="folder">
                        <NavLink
                            to='/addFolder'
                            style={{ textDecoration: 'none' }}
                            activeClassName="activeNavLink"
                            className="folder-NavLink">
                            + Add Folder
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}