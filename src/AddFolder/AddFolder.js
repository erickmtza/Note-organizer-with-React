import React from 'react';
import './AddFolder.css'

import PropTypes from 'prop-types';

class AddFolder extends React.Component {

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    submitNewFolder = (e) => {
        e.preventDefault();
        
        const folder = {
            "id": `${e.target.folder.value}-${new Date()}`,
            "name": e.target.folder.value,
        }

        fetch(`http://localhost:9090/folders`, {
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
          this.props.addFolder(folderDataRes)
          this.props.history.push(`/folder/${folderDataRes.id}`)
        })
        .catch(error => {
          console.error({ error })
        })
    }
      
    render() {
        console.log(this.props)
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

AddFolder.propTypes = {
    addFolder: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default AddFolder;