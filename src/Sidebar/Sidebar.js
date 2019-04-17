import React from 'react';
import './Sidebar.css';

import { NavLink, Link } from 'react-router-dom';

function Sidebar(props) {

    const folders = props.folders.map(file => (
        <NavLink to={`/folder/${file.id}`} key={file.id}>
            <li
                key={file.id}
                className="Folders"
            >
                {file.folder_name}
            </li>
        </NavLink>
    ))

    return (
        <div id="sidebar">
            <ul>
                {folders}
            </ul>
            <Link to='/add-folder'>Add Folder</Link>
        </div>
        
    )
}

export default Sidebar;