import React from 'react';
import './Note.css'

import NotefulContext from '../NotefulContext/NotefulContext';

function handleClickDelete(noteId, callback, goback) {

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        callback(noteId)
        goback()
      })
      .catch(error => {
        console.error({ error })
      })
  }

export default class Note extends React.Component {

    static contextType = NotefulContext;

    render() {
    const note = this.context.notes.find(note => note.name === this.props.match.params.noteId)    

    const modifiedDate = new Date(note.modified);

    
       return (
            <section className="note-content">
                <h2>{note.name}</h2>
                <p>{note.content}</p>
                <p>{modifiedDate.toDateString()}</p>
                <button
                    type='button'
                    onClick={() => handleClickDelete(note.id, this.context.deleteNote, () => this.props.history.push('/')) }
                >Delete Note</button>
            </section>
        ) 
    }
    
}