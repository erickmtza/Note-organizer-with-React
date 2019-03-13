import React from 'react';
import './Sidebar.css';

import { NavLink, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

function Sidebar(props) {
    const folders = props.folders.map(file => (
        <NavLink to={`/folder/${file.id}`} key={file.id}>
            <li
                key={file.id}
                className="Folders"
            >
                {file.name}
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

Sidebar.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
}

Sidebar.defaultProps = {
    folders: []
};

export default Sidebar;