import React from 'react';

function AddFolder(props) {

    return (
        <form className='AddFolder'>
            <h2>Create a folder</h2>
            <div className='field'>
                <label htmlFor='folder-name-input'>
                    Folder Name:
                </label>
                {' '}
                <input type='text' id='folder-name-input' />
            </div>
            <div className='buttons'>
                <button type='submit'>
                    Add folder
                </button>
                {' '}
                <button type='submit' onClick={props.onClickCancel}>
                    Cancel
                </button>
            </div>
      </form>
    )
}

export default AddFolder;