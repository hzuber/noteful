import React from 'react';
import {NavLink} from 'react-router-dom';
import './sidebar.css';
import NOTES from '../noteStore/noteStore.js';

export default function SideBar (){
    return (
        <div className="sidebar-container">
            <ul className="folder-list">
                {NOTES.folders.map(folder =>
                    <NavLink 
                        to = {`/folder/${folder.id}`} 
                        style={{ textDecoration: 'none' }}
                        activeClassName="activeNavLink"
                        className="NavLink">
                        <li 
                            key={folder.id}
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