import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Notepage from './notePage/notePage';
import Sidebar from './Sidebar/sidebar';
import NoteList from './noteList/noteList';
import NoteSideBar from './noteSidebar/noteSidebar';

class App extends Component {
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to = '/'>
          <h1>
            Noteful
          </h1>
        </Link>
      </header>
      <main className="App-main">
        <div className="App-sidebar">
          <Route exact path='/' component={Sidebar}/>
          <Route path='/folder/:folderId' component={Sidebar} />
          <Route path= '/note/:noteId' component={NoteSideBar} />
        </div>
        <div className="App-content">
          <Route exact path='/' component={NoteList} />
          <Route path='/folder/:folderId' component={NoteList} />
          <Route 
            path= '/note/:noteId' 
            render={({history }) => {
              return <Notepage
                onGoBack= {() => history.goBack()}
              />
            }}
          />
        </div>
      </main>
    </div>
  )};
}

export default App;
