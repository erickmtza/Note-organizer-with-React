import React from 'react';
import './App.css';

import STORE from './STORE';

import Sidebar from './Sidebar/Sidebar';
import NotesList from './NotesList/NotesList';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder'
import Note from './Note/Note';
import SidebarNote from './SidebarNote/SidebarNote';

import { Route, Link } from 'react-router-dom';

class App extends React.Component {

  state = {
    folders: STORE.folders,
    notes: STORE.notes
  }

  render() {

    return (
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
          render={(routeProps) => {
            console.log(routeProps.match.params)
            const folderName = this.state.notes.find(note => (note.name === routeProps.match.params.noteId))
            console.log(folderName)
            return <SidebarNote
              onClickCancel={() => routeProps.history.push('/')}
              folderName={this.state.folders.find(folder => folder.id === folderName.folderId) 
              }
            />
          }}
        />

        <main className='App'>
          <Route
            exact path="/"
            render={() => (
              <NotesList
                notes={this.state.notes}
              />
            )}
          />

          <Route
            path="/folder/:folderId"
            render={({match}) => (
              console.log(match),
              <NotesList
                notes={this.state.notes.filter(note => note.folderId === match.params.folderId )}
              />
            )}
          />

          <Route
            path="/note/:noteId"
            render={({match}) => (
              console.log(match),
              <Note
                note={this.state.notes.find(note => note.name === match.params.noteId)}
              />
            )}
          />

          <Route
            path="/add-note"
            render={({history}) => {
              return <AddNote
                onClickCancel={() => history.push('/')}
              />
            }}
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
