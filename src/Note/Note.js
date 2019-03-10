import React from 'react';
import './Note.css'

import NotefulContext from '../NotefulContext/NotefulContext';

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
                <button>Delete Note</button>
            </section>
        ) 
    }
    
}