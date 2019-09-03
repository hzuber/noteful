import React, {Component} from 'react';
import NotefulContext from '../notefulContext';
import './AddNote.css';
import RandomString from '../randomNumber';

export default class AddFolder extends Component{
    static contextType = NotefulContext;

    handleSubmit = e => {
        const {setError} = this.context
        e.preventDefault();
        const { name, content, folderId } = e.target;
        const modified = new Date().toISOString();
        const id = RandomString(35)
        const note = {
            name: name.value,
            id,
            content: content.value,
            modified,
            folderId: folderId.value
        }
        console.log('note is ' + note)
        
        fetch(`http://localhost:9090/notes`, {
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
            folderId.value=''
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
            this.props.match.params.folderId ? 
            folders.find(folder =>  folder.id ===this.props.match.params.folderId) : 
            null;
        const whichFolder = folder ?
            <option value={folder.id}>{folder.name}</option> : 
            <option value="None">Select one...</option>;
        console.log('whichFolder is ' + whichFolder)
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
                        <label htmlFor="folderId">
                            Choose which folder to place your note in:
                        </label>
                        <select id='folderId' name='folderId' required aria-required="true">
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