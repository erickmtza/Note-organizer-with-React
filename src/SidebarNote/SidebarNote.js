import React from 'react';
import './SidebarNote.css'

import NotefulContext from '../NotefulContext/NotefulContext';

export default class SidebarNote extends React.Component {
    static contextType = NotefulContext;

    handleBackCancel = () => {
        this.props.history.goBack()
      }
      
    findFolderName = this.context.notes.find(note => (note.name === this.props.match.params.noteId))
        
    folderName = this.context.folders.find(folder => folder.id === this.findFolderName.folderId)
        
    render() {
        console.log(this.findFolderName)
        console.log(this.folderName)
        return (
            <div className="sidebar-note">
                <button onClick={this.handleBackCancel} >Go back</button>
                <p>{this.folderName.name}</p>
            </div>
        )
    }
    
}