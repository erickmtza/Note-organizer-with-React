import React from 'react';

import PropTypes from 'prop-types';

class AddNote extends React.Component {

    submitNewNote = (e) => {
        e.preventDefault();
        
        const note = {
            "id": `${e.target.name.value}-${new Date()}`,
            "name": e.target.name.value,
            "modified": new Date(),
            "folderId": e.target.folder.value,
            "content": e.target.description.value
        }

        console.log(note)

        fetch(`http://localhost:9090/notes`, {
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
          this.props.addNote(data)
          this.props.history.push(`/folder/${data.folderId}`)
        })
        .catch(error => {
          console.error({ error })
        })
    }
    
    render() {
        const folders = this.props.folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)
        console.log(this.props)
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
                    <button type='submit' onClick={() => this.props.history.push('/')}>
                        Cancel
                    </button>
                </fieldset>
            </form>
        )
    }
}

AddNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
    addNote: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object,
    match: PropTypes.object
}

AddNote.defaultProps = {
    folders: []
};

export default AddNote;