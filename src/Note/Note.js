import React from 'react';
import './Note.css'

export default function Note(props) {

    const { note } = props

    const modifiedDate = new Date(note.modified);

    return (
        <section className="note-content">
            <h2>{note.name}</h2>
            <p>{note.content}</p>
            <p>{modifiedDate.toDateString()}</p>
            <button>Delete Note</button>
        </section>
        
    )
}