import React from 'react';
import './AddNote.css'

import NotefulContext from '../NotefulContext/NotefulContext';

class AddNote extends React.Component {
    handleClickCancel = () => {
        this.props.history.push('/')
    }

    static contextType = NotefulContext;

    submitNewNote = (e) => {
        e.preventDefault();
        
        const note = {
            "note_name": e.target.name.value,
            "folder_id": e.target.folder.value,
            "content": e.target.description.value
        }

        console.log(note)

        fetch(`http://localhost:8000/api/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
            // get the error message from the response,
            return res.json().then(error => {
                // then throw it
                throw error
            })
            }
            return res.json()
        })
        .then(data => {
          this.context.addNote(data)
          this.props.history.push(`/folder/${data.folder_id}`)
        })
        .catch(error => {
          console.error({ error })
        })
    }
    
    render() {
        
        const folders = this.context.folders.map(folder => <option key={folder.id} value={folder.id}>{folder.folder_name}</option>)

        return (
            <form className="add-note-form" onSubmit={this.submitNewNote}>
                <fieldset>
                    <legend>Create a note</legend>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            <p>Name</p>
                        </label>
                        <input type='text' id='note-name-input' name='name' required/>
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                            <p>Content</p>
                        </label>
                        <textarea id='note-content-input' name='description' required/>
                    </div>
                    <p>Store in folder:</p>
                    <select name='folder'>
                        
                        {folders}
                    </select>
                    <button type='submit'>
                        Add note
                    </button>
                    {' '}
                    <button type='submit' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </fieldset>
            </form>
        
        )
    }
}

export default AddNote;