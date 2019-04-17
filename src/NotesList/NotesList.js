import React from 'react';
import './NotesList.css'

import { Link } from 'react-router-dom';

import NotefulContext from '../NotefulContext/NotefulContext';

class NotesList extends React.Component {

    static contextType = NotefulContext;

    filteredNotes = () => this.context.notes.filter(note => note.folder_id === Number(this.props.match.params.folderId) ).map( note => (
        <li
            key={note.id}
        >
            <Link to={`/note/${note.id}`}><h2>{note.note_name}</h2></Link>
            <Link to={`/note/${note.id}`}><button>Delete?</button></Link>
            
        </li>
    ))

    notes = () => {
        if(this.props.match.params.folderId === undefined) {
            return this.context.notes.map( note => (
                <li
                    key={note.id}
                >
                    <Link to={`/note/${note.id}`}><h2>{note.note_name}</h2></Link>
                    <Link to={`/note/${note.id}`}><button>Delete?</button></Link>
                </li>
            ))} else {
                return this.filteredNotes()
            }
    }
        
    
    render() {
        console.log(typeof this.props.match.params.folderId)
        console.log(this.context.notes.map(note => typeof note.folder_id))
        
        return (
            <section >
                <ul className="list-container">
                    {this.notes()}
                </ul>
                <Link to='/add-note'>Add Note</Link>
            </section>
        )
    }
    
}

export default NotesList;