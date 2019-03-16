import React from 'react';
import './Note.css'

import PropTypes from 'prop-types';

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

    render() {
      const { note } = this.props

      const modifiedDate = new Date(note.modified);

      return (
        <section className="note-content">
            <h2>{note.name}</h2>
            <p>{note.content}</p>
            <p>{modifiedDate.toDateString()}</p>
            <button
                type='button'
                onClick={() => handleClickDelete(note.id, this.props.deleteNote, this.props.history.push('/') )}
            >Delete Note</button>
        </section>
        ) 
    }
}

Note.propTypes = {
  note: PropTypes.objectOf(PropTypes.PropTypes.string.isRequired).isRequired,
  deleteNote: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
  match: PropTypes.object
}

Note.defaultProps = {
  note: {}
};