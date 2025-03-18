import "./LevelRow.css";
import Level from "../Level/Level.jsx";
import React from "react";

const LevelRow = ({number, isOffset, setCurrentLevel}) => {
    return (
        <div className={`LevelRow ${isOffset ? "offset" : ""}`}>
            <Level key={number} number={number} setCurrentLevel={setCurrentLevel}/>
        </div>
    )
}
export default LevelRow;