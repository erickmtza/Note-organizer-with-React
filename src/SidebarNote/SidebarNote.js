import React from 'react';

export default function SidebarNote(props) {
    console.log(props.folderName)
    return (
        <div>
            <button onClick={props.onClickCancel} >Go back</button>
            <p>{props.folderName.name}</p>
        </div>
    )
}