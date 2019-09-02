import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './noteList.css';
import NotefulContext from '../notefulContext';
import PropTypes from 'prop-types';

export default class NoteList extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;
    render() {
        const { notes } = this.context;
        const noteList = this.props.match.params.folderId ?
            notes.filter(note =>
                note.folderId === this.props.match.params.folderId) :
            notes;
        const orderedNoteList = noteList.sort((note1, note2) =>
        note1.modified < note2.modified ? 1 : -1
    )
        return (
            <>
                <ul className="note-list">
                    {orderedNoteList.map((note) =>
                        <li className="note"
                        key={note.id}>
                            <Link
                                to={`/note/${note.id}`}
                                style={{ textDecoration: 'none' }}
                                className="note-Link">
                                <h4>{note.name}</h4>
                                <p>Modified on&nbsp;
                                <Moment format="LL">
                                        {note.modified}
                                    </Moment>
                                </p>
                            </ Link> 
                        </li>  
                    )}
                    <li>
                        <Link 
                            to='/addNote'
                            style={{ textDecoration: 'none' }}
                            className="note-Link">
                            <button className="add-note-btn note">
                            Add note
                            </button>
                        </Link>
                    </li>
                </ul>
            </>
        )
    }
}


NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        name: (props, propName, componentName) => {
            const prop = props[propName];
        
            if(!prop) {
            return new Error(`${propName} is required in ${componentName}. Validation Failed`);
            }
        },
        id: (props, propName, componentName) => {
            const prop = props[propName];
            const { notes } = this.context

            if(!prop) {
            return new Error(`${propName} is required in ${componentName}. Validation Failed`);
            }

            if(prop < 8 || prop > 30) {
            return new Error(`Invalid prop, ${propName} should be in range 8-30 in ${componentName}. ${prop} found.`);
            }

            if(notes.find(note => note.id === prop)){
                return new Error(`Invalid prop, ${propName} must be original. ${prop} is already a ${propName}.`)
            }
        },
        folderId: (props, propName, componentName) => {
            const prop = props[propName];
            if(prop === 'None') {
                return new Error(`${propName} is required in ${componentName}. Validation Failed`);
                }
        }
    }))
}