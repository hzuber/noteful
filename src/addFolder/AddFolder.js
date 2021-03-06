import React, {Component} from 'react';
import NotefulContext from '../notefulContext';
import './AddFolder.css';
import config from '../config'

export default class AddFolder extends Component{
    static contextType = NotefulContext;

    handleSubmit = e => {
        const { setError } = this.context;
        e.preventDefault();
        const { name } = e.target;
        const folder = {
            name: name.value
        }

        this.setState({ error:null })
        fetch(`${config.API_ENDPOINT}/api/folders`, {
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
            this.props.history.push('/')
            this.context.addFolder(data)
        })
        .catch(error => {
            setError({error})
        })
    }

    render() {
        const Required = () => (
            <span className='addFolder-required'>*</span>
          )
        const {error} = this.context;
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
                    <div className='addFolder-buttons'>
                        <button type='submit' className='addFolder-submit-btn'>
                            Add Folder
                        </button>
                        <button type="button" className='addFolder-cancel-btn' onClick={() => this.props.history.goBack()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}