import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import './notePage.css';
import NotefulContext from '../notefulContext.js';

class NotePage extends Component {
    static contextType = NotefulContext
    static defaultProps ={
        deleteNote: () => {},
        match: {
            params:{}
        }
    }
    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            date_modified: '',
            content: '',
            folder_id: ''
        }
    }

    componentDidMount(){
        const noteId = this.props.match.params.note_id;
        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'GET',
            header: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(res => {
            this.setState({
                id: noteId,
                name: res.name,
                content: res.content,
                date_modified: res.date_modified,
                folder_id: res.folder_id
            })
        })
    }

    deleteNoteRequest() {
        const noteId = Number(this.props.match.params.note_id);

        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                if (!res.ok) {
                    return res.then(error => {
                        throw error
                    })
                }
                return res
            })
            .then((data)=> {
                this.props.history.push('/');
                this.context.deleteNote(noteId);
            })
            .catch(error => {
                console.error(error)
            })
    }
    
    render() {
        const { id, name, content, date_modified } = this.state;
        return (
            <article className="Note">
                <header className="note-header">
                    <button
                        className="go-back-btn"
                        onClick={() => this.props.history.goBack()}>
                        Go Back
                    </button>
                    <div className="note-header-text">
                        <h3>{name}</h3>
                        <p>Modified on &nbsp;
                            <Moment format="LL">
                                {date_modified}
                            </Moment>
                        </p>
                    </div>
                    <button
                        className='delete-btn'
                        onClick={() => this.deleteNoteRequest()}>
                        Delete
                    </button>
                    <Link to = {`/note/${id}/edit`}>
                        <button
                            className='edit-btn'>
                                Edit
                        </button>  
                    </Link>  
                </header>
                <p className='note-content'>{content}</p>
            </article>
        )
    
    }
}

export default NotePage;