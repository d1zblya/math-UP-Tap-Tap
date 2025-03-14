import React from 'react';
import "./Avatar.css"

function Avatar({imageUrl, size = 40}) {
    return (
        <img
            src={imageUrl}
            alt="Avatar"
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                objectFit: 'cover',
            }}
        />
    );
}

export default Avatar;
