import React, { Component } from 'react';
import Moment from 'react-moment';
import './notePage.css';
import NotefulContext from '../notefulContext.js';
import PropTypes from 'prop-types';

class NotePage extends Component {
    static defaultProps ={
        deleteNote: () => {},
        match: {
            params:{}
        }
    }
    static contextType = NotefulContext

    deleteNoteRequest() {
        const {notes=[]} = this.context;
        const note = notes.find(
            note => note.id === this.props.match.params.noteId);
        console.log('note.name from top of fetch: ' + note.name)

        fetch(`http://localhost:9090/notes/${note.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) 
                    return res.json()
                        .then(e => Promise.reject(e))
                return res.json()
            })
            .then(()=> {
                this.props.history.push('/');
            })
            .then(() => {
                this.context.deleteNote(note.id);
            })
            .catch(error => {
                console.error(error)
            })
    }
    
    render() {
        const {notes=[]} = this.context;
        console.log('render the notePage');
        const note = notes.find(
            note => note.id === this.props.match.params.noteId);
        return (
            <article className="Note">
                <header className="note-header">
                    <button
                        className="go-back-btn"
                        onClick={() => this.props.history.goBack()}>
                        Go Back
                    </button>
                    <div className="note-header-text">
                        <h3>{note.name}</h3>
                        <p>Modified on &nbsp;
                            <Moment format="LL">
                                {note.modified}
                            </Moment>
                        </p>
                    </div>
                    <button
                        className='delete-btn'
                        onClick={() => this.deleteNoteRequest()}>
                        Delete
                    </button>
                </header>
                <p className='note-content'>{note.content}</p>
            </article>
        )
    
    }
}

export default NotePage;

NotePage.propTypes = {
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