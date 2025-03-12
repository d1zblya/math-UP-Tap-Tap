import "./QuestNavigationLink.css"
import React from "react";

const QuestNavigationLink = ({title, state, setActiveTab}) => {
    return (
        <button
            className='QuestNavigationLink'
            onClick={() => setActiveTab(title)}
            style={{
                backgroundColor: state === "active" ? "#1E1E1E" : "#0D0D0D",
            }}>
            {title}
        </button>
    )
}
export default QuestNavigationLink