import React from 'react';
import Avatar from '../Avatar/Avatar.jsx';
import "./UserPanel.css"

function UserPanel({username, avatarUrl}) {
    return (
        <div className="UserPanel">
            <Avatar imageUrl={avatarUrl} size={50}/>
            <span className={"username"}>{username}</span>
            <span className="info">
                <svg width="30" height="30" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="53" height="53" rx="11" stroke="white" strokeWidth="2"/>
                  <path
                      d="M26.0381 46V20.1016H30.3711V46H26.0381ZM28.2046 15.7437C26.7354 15.7437 25.5151 14.5234 25.5151 13.0542C25.5151 11.5601 26.7354 10.3647 28.2046 10.3647C29.6987 10.3647 30.9189 11.5601 30.9189 13.0542C30.9189 14.5234 29.6987 15.7437 28.2046 15.7437Z"
                      fill="white"/>
                </svg>
            </span>
        </div>
    );
}

export default UserPanel;
