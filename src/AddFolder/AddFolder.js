import React from 'react';
import './AddFolder.css'

import NotefulContext from '../NotefulContext/NotefulContext';

class AddFolder extends React.Component {

    static contextType = NotefulContext;

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    submitNewFolder = (e) => {
        e.preventDefault();
        
        const folder = {
            "folder_name": e.target.folder.value,
        }

        console.log(folder)

        fetch(`https://sleepy-meadow-67516.herokuapp.com/api/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
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
        .then(folderDataRes => {
          this.context.addFolder(folderDataRes)
          this.props.history.push(`/folder/${folderDataRes.id}`)
        })
        .catch(error => {
          console.error({ error })
        })
    }
      
    render() {
        return (
            <form className='AddFolder' onSubmit={this.submitNewFolder}>
                <h2>Create a folder</h2>
                <div className='field'>
                    <label htmlFor='folder-name-input'>
                        Folder Name:
                    </label>
                    {' '}
                    <input type='text' id='folder-name-input' name='folder' required/>
                </div>
                <div className='buttons'>
                    <button type='submit'>
                        Add folder
                    </button>
                    {' '}
                    <button type='submit' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        ) 
    }
    
}

export default AddFolder;