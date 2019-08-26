import React from 'react';
import {Link} from 'react-router-dom';
import './sidebar.css';
import NOTES from '../noteStore/noteStore.js';

export default function SideBar (){
    return (
        <div className="sidebar-container">
            <ul>
                {NOTES.folders.map(folder =>
                    <Link to = {`/folder/${folder.id}`}>
                        <li key={folder.id}>
                            {folder.name}
                        </li>
                    </Link>
                    )
                }
                <li>Add Folder</li>
            </ul>
        </div>
    )    
}