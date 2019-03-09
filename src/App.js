import React from 'react';
import './App.css';

import STORE from './STORE';

import Sidebar from './Sidebar/Sidebar';
import NotesList from './NotesList/NotesList';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder'
import Note from './Note/Note';

import { Route, Link } from 'react-router-dom';

class App extends React.Component {

  getNotesForFolder = (notes = [], folderId) => (
    (!folderId)
      ? notes
      : notes.filter(note => note.folderId === folderId)
  )

  render() {

    return (
      <div className="App">

        <header>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>

        <Sidebar
          folders={STORE.folders}
        />

        <main className='App'>
          <Route
            exact path="/"
            render={() => (
              <NotesList
                notes={STORE.notes}
              />
            )}
          />

          <Route
            path="/folder/:folderId"
            render={({match}) => (
              console.log(match),
              <NotesList
                notes={STORE.notes.filter(note => note.folderId === match.params.folderId )}
              />
            )}
          />

          <Route
            path="/note/:noteId"
            render={({match}) => (
              console.log(match),
              <Note
                note={STORE.notes.find(note => note.name === match.params.noteId)}
              />
            )}
          />

          <Route
            path="/add-note"
            component={AddNote}
          />

          <Route
            path="/add-folder"
            render={({history}) => {
              return <AddFolder
                onClickCancel={() => history.push('/')}
              />
            }}
          />
        </main>

      </div>
    );
  }
}

export default App;
