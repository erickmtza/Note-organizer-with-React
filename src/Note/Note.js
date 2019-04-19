import React from 'react';
import './Note.css'

import NotefulContext from '../NotefulContext/NotefulContext';

function handleClickDelete(noteId, callback, goback) {
  
    fetch(`https://sleepy-meadow-67516.herokuapp.com/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res//.json() Here json() is removed because when you receive an empty response (without payload) you don't need to call the json method
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
    const note = this.context.notes.find(note => note.id === Number(this.props.match.params.noteId))    

    const modifiedDate = new Date(note.date_created);
    console.log(note.id)

    
       return (
            <section className="note-content">
                <h2>{note.note_name}</h2>
                <p>{note.content}</p>
                <p>{modifiedDate.toDateString()}</p>
                <button
                    type='button'
                    onClick={() => handleClickDelete(note.id, this.context.deleteNote, this.props.history.push('/') )}
                >Delete Note</button>
            </section>
        ) 
    }
    
}