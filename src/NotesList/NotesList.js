import React from 'react';
import './NotesList.css'

import { Link } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import PropTypes from 'prop-types';

class NotesList extends React.Component {

    notes = () => this.props.notes.map( note => (
        <li
            key={note.id}
        >
            <Link to={`/note/${note.name}`}><h2>{note.name}</h2></Link>
            <Link to={`/note/${note.name}`}><button>Delete?</button></Link>
            
        </li>
    ))
        
    render() {
        return (
            <section >
                <ErrorBoundary>
                    <ul className="list-container">
                        {this.notes()}
                    </ul>
                    <Link to='/add-note'>Add Note</Link>
                </ErrorBoundary> 
            </section>
        )
    }
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired
      })),
}

NotesList.defaultProps = {
    notes: []
};

export default NotesList;