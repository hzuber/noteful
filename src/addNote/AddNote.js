import React, {Component} from 'react';
import NotefulContext from '../notefulContext';
import './AddNote.css';
import RandomString from '../randomNumber';

export default class AddFolder extends Component{
    static contextType = NotefulContext;
    state = {
        error: null,
        modified: new Date(),
        id: RandomString(35)
    };

    handleSubmit = e => {
        console.log('starting handleSubmit, state is ' + this.state)
        e.preventDefault();
        const { name, content, folderId } = e.target;
        const { modified, id } = this.state;
        const note = {
            name: name.value,
            id: id,
            content: content.value,
            modified: modified,
            folderId: folderId.value
        }
        console.log('note is ' + note)
        
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
            content.value =''
            folderId.value=''
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
                            aria-required="true"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="folderId">
                            Choose which folder to place your note in:
                        </label>
                        <select id='folderId' name='folderId' required aria-required="true">
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
                        <button className='addNote-cancel-btn' onClick={() => this.props.history.goBack()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}