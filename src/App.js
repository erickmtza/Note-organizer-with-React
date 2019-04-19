import React from 'react';
import './App.css';

import STORE from './STORE';

import Sidebar from './Sidebar/Sidebar';
import NotesList from './NotesList/NotesList';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder'
import Note from './Note/Note';
import SidebarNote from './SidebarNote/SidebarNote';

import NotefulContext from './NotefulContext/NotefulContext';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import { Route, Link } from 'react-router-dom';

class App extends React.Component {

  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    Promise.all([
      fetch(`https://sleepy-meadow-67516.herokuapp.com/api/notes`),
      fetch(`https://sleepy-meadow-67516.herokuapp.com/api/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
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

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  render() {
    console.log(this.state.notes.map(note => note.id))

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    } 

    return (
      <NotefulContext.Provider
        value={contextValue}  
      >
        <div className="App">

          <header>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          
          <Route
            exact path='/'
            render={() => (
              <Sidebar
                folders={this.state.folders}
              />
            )}
          />

          <Route
            path='/folder'
            render={() => (
              <Sidebar
                folders={this.state.folders}
              />
            )}
          />

          <Route
            path='/note/:noteId'
            component={SidebarNote}
          />

          <main className='App'>
          
            <Route
              exact path="/"
              component={NotesList}
            />

            <Route
              path="/folder/:folderId"
              component={NotesList}
            />

            <Route
              path="/note/:noteId"
              component={Note}
            />

            <Route
              path="/add-note"
              component={AddNote}
            />

            <Route
              path="/add-folder"
              component={AddFolder}
            />
          </main>

        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
