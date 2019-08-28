import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import NotefulContext from '../notefulContext';

export default class SideBar extends Component {
    static contextType = NotefulContext;

    render() {
        const { folders } = this.context
        return (
            <div className="sidebar-container">
                <ul className="folder-list">
                    {folders.map(folder =>
                        <NavLink
                            key={folder.id}
                            to={`/folder/${folder.id}`}
                            style={{ textDecoration: 'none' }}
                            activeClassName="activeNavLink"
                            className="NavLink">
                            <li
                                className="folder">
                                {folder.name}
                            </li>
                        </NavLink>
                    )
                    }
                    <li className="folder">+ Add Folder</li>
                </ul>
            </div>
        )
    }
}