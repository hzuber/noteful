import React, { Component } from 'react';
import './editNote.css';
import NotefulContext from '../notefulContext'

class EditNote extends Component {
    static contextType = NotefulContext
    static defaultProps ={
        deleteNote: () => {},
        match: {
            params:{}
        }
    }
    constructor(props){
        super(props);
        this.state ={
            error: null,
            id: '',
            name: '',
            date_modified: '',
            content: '',
            folder_id: 1
        }
    }

    componentDidMount(){
        console.log('component mounted')
        const noteId = Number(this.props.match.params.note_id)
        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'GET'
        })
        .then(res => (res.ok ? res: Promise.reject(res))
            
        .then(res => res.json())
        .then(res => {
            this.setState({
                id: res.id,
                name: res.name,
                date_modified: res.date_modified,
                content: res.content,
                folder_id: res.folder_id
            })
            console.log(this.state)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { id, name, content, folder_id } = this.state;
        const newDate = new Date().toISOString();
        const newNote = { id, name, content, folder_id, date_modified: newDate }
        console.log(newNote)
        fetch(`http://localhost:8000/api/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.then(error => {
                    throw error
                })
            }
        })
        .then(() => {
            this.setState({
                error: null,
                id: '',
                name: '',
                date_modified: '',
                content: '',
                folder_id: 1
            })
            this.context.editNote(newNote)
        })
        .then(()=> {
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleNameChange = (name) => {
        this.setState({name})
    }

    handleContentChange = (content) => {
        this.setState({content})
    }

    handleFolderChange = (folder_id) => {
        this.setState({folder_id})
    }

    clickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { folders } = this.context
        const { error, name, content, folder_id} = this.state;
        const chooseFolder = folders.map(folder => <option value={folder.id} key={folder.id}>{folder.name}</option>);
        return (
            <section className = "editNoteContainer">
                <h2>Edit Note</h2>
                <form
                    className = "editNoteForm"
                    onSubmit = {e => this.handleSubmit(e)}>
                        <div className = 'EditNote_error'>
                            {error && <p>{error.message}</p>}
                        </div>
                        <label htmlFor="name">
                            Name:
                        </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={e => this.handleNameChange(e.target.value)}/>
                        <label htmlFor="content">
                            Content:
                        </label>
                            <input
                                type="text"
                                name="content"
                                id="content"
                                value={content}
                                onChange={e => this.handleContentChange(e.target.value)}/>
                        <label htmlFor="folder-id">
                            Folder: 
                        </label>
                        <select 
                            id="folder_id" 
                            name="folder_id"
                            value={folder_id}
                            onChange={e => this.handleFolderChange(e.target.value)}>
                            {chooseFolder}
                        </select>
                        <div className = "editForm_buttons">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={this.clickCancel}>Cancel</button>
                        </div>
                    </form>
            </section>
        )
    }
}
export default EditNote;