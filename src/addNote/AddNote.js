import React, {Component} from 'react';
import NotefulContext from '../notefulContext';
import './AddNote.css';
import config from '../config'

export default class AddFolder extends Component{
    static contextType = NotefulContext;

    handleSubmit = e => {
        const {setError} = this.context
        e.preventDefault();
        const { name, content, folder_id } = e.target;
        const modified = new Date().toISOString();
        const note = {
            name: name.value,
            content: content.value,
            date_modified: modified,
            folder_id: folder_id.value
        }
        
        fetch(`${config.API_ENDPOINT}/api/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            name.value=''
            content.value =''
            folder_id.value=''
            this.props.history.push('/')
            this.context.addNote(data)
        })
        .catch(error => {
            setError({error})
        })
    }

    render() {
        const {folders=[], error} = this.context;
        const folder = 
            this.props.match.params.folder_id ? 
            folders.find(folder =>  folder.id === Number(this.props.match.params.folder_id)) : 
            null;
        const whichFolder = folder ?
            <option value={folder.id}>{folder.name}</option> : 
            <option value="None">Select one...</option>;
        const chooseFolder = folders.map(folder => <option value={folder.id} key={folder.id}>{folder.name}</option>);
        const Required = () => (
            <span className='addNote-required'>*</span>
          );

        return (
            <section className = "AddNote">
                <h2>Add a Note</h2>
                <form
                    className='addNote-form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='addNote-error' role='alert'>
                       {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='name'>
                            Note Name
                            {' '}
                            <Required />
                        </label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder='My Note'
                            aria-required="true"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="folder_id">
                            Choose which folder to place your note in:
                        </label>
                        <select id='folder_id' name='folder_id' required aria-required="true">
                            {whichFolder}
                            {chooseFolder}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='content'>
                            Type the contents of your note here:
                        </label>
                        <input
                            type="text"
                            name='content'
                            id='content'
                            placeholder='...'
                        />
                    </div>
                    <div className='addNote-buttons'>
                        <button type='submit' className='addNote-submit-btn'>
                            Add Note
                        </button>
                        <button className='addNote-cancel-btn' onClick={() => this.props.history.goBack()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}