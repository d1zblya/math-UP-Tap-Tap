import "./NavigationLink.css"
import React from "react";

const NavigationLink = ({title, state, setActiveTab}) => {
    return (
        <button
            className='NavigationLink'
            onClick={() => setActiveTab(title)}
            style={{
                backgroundColor: state === "active" ? "#1E1E1E" : "#0D0D0D",
            }}>
            {title}
        </button>
    )
}
export default NavigationLink;