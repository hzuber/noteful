import React, {Component} from 'react';
import NotefulContext from '../notefulContext';
import './AddFolder.css';

export default class AddFolder extends Component{
    static contextType = NotefulContext;

    state = {
        error: null,
    };

    handleSubmit = e => {
        console.log('starting handleSubmit')
        e.preventDefault();
        const { name, id } = e.target;
        const folder = {
            name: name.value,
            id: id.value}
            
        console.log(folder)

        this.setState({ error:null })
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
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
            console.log(data)
            this.props.history.push('/')
            this.context.addFolder(data)
        })
        .catch(error => {
            this.setState({error})
        })
    }

    render() {
        const Required = () => (
            <span className='addFolder-required'>*</span>
          )
        const {error} = this.state
        return (
            <section className = "AddFolder">
                <h2>Add a Folder</h2>
                <form
                    className='addFolder-form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='addFolder-error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='name'>
                            Folder Name
                            {' '}
                            <Required />
                        </label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder='My Folder'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='id'>
                            Folder Id
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
                        <p className='addFolder-hint'>Must be between 8-30 characters and not match any other folder Ids.</p>
                    </div>
                    <div className='addFolder-buttons'>
                        <button type='submit' className='addFolder-submit-btn'>
                            Add Folder
                        </button>
                        <button className='addFolder-cancel-btn'>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}