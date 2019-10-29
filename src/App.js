import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import config from './config'
import Notepage from './notePage/notePage';
import Sidebar from './Sidebar/sidebar';
import NoteList from './noteList/noteList';
import AddFolder from './addFolder/AddFolder';
import AddNote from './addNote/AddNote';
import NotefulContext from './notefulContext';
import NotefulError from './NotefulError';
import EditNote from './editNote/editNote'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(
      note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  editNote = (editedNote) => {
    const newNotes = this.state.notes.map(note =>
      (note.id !== editedNote.id) ? note : editedNote
      )
      this.setState({
        notes: newNotes
      })
  }

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  cancelButton= () => {
    this.history.goBack();
  }

  setError = (error) => {
    this.setState({
      error
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
      .then(([foldersRes, notesRes]) => {
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({ folders, notes });
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      editNote: this.editNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      cancelButton: this.cancelButton,
      setError: this.setError,
      error: this.state.error
    }
    return (
      <div className="App">
        <NotefulContext.Provider value={contextValue}>
          <div className="App-sidebar">
            <NotefulError>
              <Route exact path='/' component={Sidebar} />
              <Route path='/addFolder' component={Sidebar} />
              <Route path='/addNote' component={Sidebar} />
              <Route path='/folder/:folder_id' component={Sidebar} />
              <Route path='/note/:note_id' component={Sidebar}/> 
            </NotefulError>
          </div>
          <main className="App-main">
            <header className="App-header">
              <Link to='/' className="header-text">
                <h1>
                  Noteful
                </h1>
              </Link>
            </header>
            <div className="App-content">
              <NotefulError>
                <Route exact path='/' component={NoteList} />
                <Route path='/folder/:folder_id/addNote' component={AddNote} />
                <Route path='/addNote' component={AddNote} />
                <Route path='/addFolder' component={AddFolder} />
                <Route exact path='/folder/:folder_id' component={NoteList} />
                <Route exact path='/note/:note_id' component = {Notepage}/>
                <Route path= '/note/:note_id/edit' component = {EditNote}/>
              </NotefulError>
            </div>
          </main>
        </NotefulContext.Provider>
      </div>
    )
  };
}

export default App;
