import React, {Component} from 'react';
import NotefulContext from '../notefulContext';
import './AddNote.css';

export default class AddFolder extends Component{
    static contextType = NotefulContext;

    state = {
        error: null,
        modified: new Date().toLocaleDateString
    };

    handleSubmit = e => {
        console.log('starting handleSubmit')
        e.preventDefault();
        const { name, id, content, folderId } = e.target;
        const { modified } = this.state;
        const note = {
            name: name.value,
            id: id.value,
            content: content.value,
            modified: this.state.modified,
            folderId: folderId.value
        }
            
        console.log(note)
        

        this.setState({ error:null })
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
            id.value=''
            content.value =''
            modified.value = ''
            folderId.value=''
            console.log(data)
            this.props.history.push('/')
            this.context.addNote(data)
        })
        .catch(error => {
            this.setState({error})
        })
    }

    render() {
        const {folders=[]} = this.context;
        const chooseFolder = folders.map(folder => <option value={folder.id}>{folder.name}</option>);
        const Required = () => (
            <span className='addNote-required'>*</span>
          )
        const {error} = this.state
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='id'>
                            Note Id
                            {' '}
                            <Required />
                        </label>
                        <input
                            type="text"
                            name='id'
                            id='id'
                            placeholder='type-a-fully-original-id-here'
                            required
                        />
                        <p className='addNote-hint'>Must be between 8-30 characters and not match any other folder Ids.</p>
                    </div>
                    <div>
                        <label htmlFor="folderId">
                            Choose which folder to place your note in:
                        </label>
                        <select id='folderId' name='folderId'>
                            <option value="None">Select one...</option>
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
                        <button className='addNote-cancel-btn'>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}