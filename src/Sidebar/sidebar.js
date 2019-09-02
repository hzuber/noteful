import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import NotefulContext from '../notefulContext';
import PropTypes from 'prop-types';

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

SideBar.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
    name: (props, propName, componentName) => {
        const prop = props[propName];
    
        if(!prop) {
          return new Error(`${propName} is required in ${componentName}. Validation Failed`);
        }
      },
    id: (props, propName, componentName) => {
        const prop = props[propName];
        const { folders } = this.context

        if(!prop) {
          return new Error(`${propName} is required in ${componentName}. Validation Failed`);
        }

        if(prop < 8 || prop > 30) {
          return new Error(`Invalid prop, ${propName} should be in range 8-30 in ${componentName}. ${prop} found.`);
        }

        if(folders.find(folder => folder.id === prop)){
            return new Error(`Invalid prop, ${propName} must be original. ${prop} is already a ${propName}.`)
        }
    
      }
    }))
}