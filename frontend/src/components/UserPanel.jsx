import React from 'react';
import Avatar from './Avatar.jsx';

function UserPanel({username, avatarUrl}) {
    return (
        <div className="UserPanel">
            <Avatar imageUrl={avatarUrl} size={30}/>
            <span>{username}</span>
            <span className="score">1000$</span>
        </div>
    );
}

export default UserPanel;
