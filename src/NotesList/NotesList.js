import React from 'react';
import './NotesList.css'

import { Link } from 'react-router-dom';

function NotesList(props) {
    const notes = props.notes.map( note => (
        <li
            key={note.id}
        >
            <Link to={`/note/${note.name}`}><h2>{note.name}</h2></Link>
            <button>Delete Note</button>
        </li>
    ))

    return (
        <section >
            <ul className="list-container">
                {notes}
            </ul>
            <Link to='/add-note'>Add Note</Link>
        </section>
    )
}

export default NotesList;