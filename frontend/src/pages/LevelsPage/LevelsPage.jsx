import "./LevelsPage.css"
import LevelRow from "../../components/levels/LevelRow/LevelRow.jsx";
import React, {useState} from "react";
import PlayPage from "../PlayPage/PlayPage.jsx";

const levels = [
    {number: 1, tasks: []},
    {number: 2, tasks: []},
    {number: 3, tasks: []},
    {number: 4, tasks: []},
    {number: 5, tasks: []},
    {number: 6, tasks: []},
    {number: 7, tasks: []},
    {number: 8, tasks: []},
    {number: 9, tasks: []},
    {number: 10, tasks: []}
];

const LevelsPage = () => {
    const [currentLevel, setCurrentLevel] = useState(null);
    if (!currentLevel) {
        return (
            <div className="level-selector">
                {levels.map((level, index) => (
                    <React.Fragment key={index}>
                        <LevelRow number={level.number} isOffset={index % 2 !== 0} setCurrentLevel={setCurrentLevel}/>
                        {/*{index < levelsRows.length - 1 && (*/}
                        {/*    <svg className="vertical-line" width="200" height="130">*/}
                        {/*        <line*/}
                        {/*            x1={index % 2 === 0 ? "30" : "280"}*/}
                        {/*            y1="0"*/}
                        {/*            x2={index % 2 === 0 ? "240" : "70"}*/}
                        {/*            y2="130"*/}
                        {/*            stroke="rgba(255, 255, 255, 0.4)"*/}
                        {/*            strokeWidth="3"*/}
                        {/*        />*/}
                        {/*    </svg>*/}
                        {/*)}*/}
                    </React.Fragment>
                ))}
            </div>
        )
    } else {
        return (
            <div className="LevelsPage">
                <PlayPage level={levels}/>
            </div>
        )
    }

}
export default LevelsPage;