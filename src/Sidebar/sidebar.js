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
                    )
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