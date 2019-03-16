import React from 'react';

import PropTypes from 'prop-types';

export default class SidebarNote extends React.Component {
        
    render() {
        console.log(typeof (this.props.onClickCancel))
        return (
            <div>
                <button onClick={this.props.onClickCancel} >Go back</button>
                <p>{this.props.folderName.name}</p>
            </div>
        )
    }
}

SidebarNote.propTypes = {
    folderName: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    onClickCancel: PropTypes.func.isRequired,
  }
  
SidebarNote.defaultProps = {
    folderName: {}
};