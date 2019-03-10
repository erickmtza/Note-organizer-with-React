import React from 'react';
import './NotesList.css'

import { Link } from 'react-router-dom';

import NotefulContext from '../NotefulContext/NotefulContext';

class NotesList extends React.Component {

    static contextType = NotefulContext;

    filteredNotes = () => this.context.notes.filter(note => note.folderId === this.props.match.params.folderId ).map( note => (
        <li
            key={note.id}
        >
            <Link to={`/note/${note.name}`}><h2>{note.name}</h2></Link>
            <Link to={`/note/${note.name}`}><button>Delete?</button></Link>
            
        </li>
    ))

    notes = () => {
        if(this.props.match.params.folderId === undefined) {
            return this.context.notes.map( note => (
                <li
                    key={note.id}
                >
                    <Link to={`/note/${note.name}`}><h2>{note.name}</h2></Link>
                    <button>Delete Note</button>
                </li>
            ))} else {
                return this.filteredNotes()
            }
    }
        
    
    render() {
        console.log(this.props.match.params.folderId)
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