import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Notepage from './notePage/notePage';
import Sidebar from './Sidebar/sidebar';
import NoteList from './noteList/noteList';
//import NoteSideBar from './noteSidebar/noteSidebar';
import NotefulContext from './notefulContext';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  deleteNote(noteId) {
    const newNotes = this.state.notes.filter(
      note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders')
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
      deleteNote: this.deleteNote
    }
    return (
      <div className="App">
        <NotefulContext.Provider value={contextValue}>
          <div className="App-sidebar">
            <Route exact path='/' component={Sidebar} />
            <Route path='/folder/:folderId' component={Sidebar} />
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
              <Route exact path='/' component={NoteList} />
              <Route path='/folder/:folderId' component={NoteList} />
              <Route path='/note/:noteId' component = {Notepage}/>
            </div>
          </main>
        </NotefulContext.Provider>
      </div>
    )
  };
}

export default App;
