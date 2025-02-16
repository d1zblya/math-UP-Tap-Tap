import React from 'react';

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
