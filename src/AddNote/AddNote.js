import React from 'react';

function AddNote(props) {

    return (
        <form className="add-note-form">
            <fieldset>
                <legend>Create a note</legend>
                <div className='field'>
                    <label htmlFor='note-name-input'>
                        Name
                    </label>
                    <input type='text' id='note-name-input' />
                </div>
                <div className='field'>
                    <label htmlFor='note-content-input'>
                        Content
                    </label>
                    <textarea id='note-content-input' />
                </div>
                <button type='submit'>
                    Add note
                </button>
            </fieldset>
        </form>
        
    )
}

export default AddNote;