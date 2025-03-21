import "./LevelsPage.css"
import LevelRow from "../../components/levels/LevelRow/LevelRow.jsx";
import React, {useEffect, useState} from "react";
import PlayLevel from "../../components/levels/PlayLevel/PlayLevel.jsx";
import {shuffleArray} from "../../utils.js";

const levels = [
    [
        {
            "level": 1,
            "expression": "2 + 3",
            "expression_latex": "2 + 3",
            "answers": [5]
        },
        {
            "level": 1,
            "expression": "5 - 1",
            "expression_latex": "5 - 1",
            "answers": [4]
        },
        {
            "level": 1,
            "expression": "4 * 2",
            "expression_latex": "4 \\cdot 2",
            "answers": [8]
        },
        {
            "level": 1,
            "expression": "6 / 3",
            "expression_latex": "6 \\div 3",
            "answers": [2]
        },
        {
            "level": 1,
            "expression": "7 + 2",
            "expression_latex": "7 + 2",
            "answers": [9]
        },
        {
            "level": 1,
            "expression": "9 - 4",
            "expression_latex": "9 - 4",
            "answers": [5]
        },
        {
            "level": 1,
            "expression": "3 * 3",
            "expression_latex": "3 \\cdot 3",
            "answers": [9]
        },
        {
            "level": 1,
            "expression": "8 / 2",
            "expression_latex": "8 \\div 2",
            "answers": [4]
        },
        {
            "level": 1,
            "expression": "1 + 8",
            "expression_latex": "1 + 8",
            "answers": [9]
        },
        {
            "level": 1,
            "expression": "10 - 5",
            "expression_latex": "10 - 5",
            "answers": [5]
        }
    ],
    [
        {
            "level": 2,
            "expression": "12 + 5",
            "expression_latex": "12 + 5",
            "answers": [17]
        },
        {
            "level": 2,
            "expression": "20 - 7",
            "expression_latex": "20 - 7",
            "answers": [13]
        },
        {
            "level": 2,
            "expression": "6 * 4",
            "expression_latex": "6 \\cdot 4",
            "answers": [24]
        },
        {
            "level": 2,
            "expression": "18 / 3",
            "expression_latex": "18 \\div 3",
            "answers": [6]
        },
        {
            "level": 2,
            "expression": "15 + 4",
            "expression_latex": "15 + 4",
            "answers": [19]
        },
        {
            "level": 2,
            "expression": "25 - 10",
            "expression_latex": "25 - 10",
            "answers": [15]
        },
        {
            "level": 2,
            "expression": "7 * 3",
            "expression_latex": "7 \\cdot 3",
            "answers": [21]
        },
        {
            "level": 2,
            "expression": "24 / 4",
            "expression_latex": "24 \\div 4",
            "answers": [6]
        },
        {
            "level": 2,
            "expression": "30 + 10",
            "expression_latex": "30 + 10",
            "answers": [40]
        },
        {
            "level": 2,
            "expression": "40 - 15",
            "expression_latex": "40 - 15",
            "answers": [25]
        }
    ],
    [
        {
            "level": 3,
            "expression": "17 + 8",
            "expression_latex": "17 + 8",
            "answers": [25]
        },
        {
            "level": 3,
            "expression": "25 - 9",
            "expression_latex": "25 - 9",
            "answers": [16]
        },
        {
            "level": 3,
            "expression": "6 * 5",
            "expression_latex": "6 \\cdot 5",
            "answers": [30]
        },
        {
            "level": 3,
            "expression": "36 / 6",
            "expression_latex": "36 \\div 6",
            "answers": [6]
        },
        {
            "level": 3,
            "expression": "28 + 7",
            "expression_latex": "28 + 7",
            "answers": [35]
        },
        {
            "level": 3,
            "expression": "40 - 12",
            "expression_latex": "40 - 12",
            "answers": [28]
        },
        {
            "level": 3,
            "expression": "8 * 4",
            "expression_latex": "8 \\cdot 4",
            "answers": [32]
        },
        {
            "level": 3,
            "expression": "45 / 5",
            "expression_latex": "45 \\div 5",
            "answers": [9]
        },
        {
            "level": 3,
            "expression": "33 + 9",
            "expression_latex": "33 + 9",
            "answers": [42]
        },
        {
            "level": 3,
            "expression": "50 - 18",
            "expression_latex": "50 - 18",
            "answers": [32]
        }
    ],
    [
        {
            "level": 3,
            "expression": "17 + 8",
            "expression_latex": "17 + 8",
            "answers": [25]
        },
        {
            "level": 3,
            "expression": "25 - 9",
            "expression_latex": "25 - 9",
            "answers": [16]
        },
        {
            "level": 3,
            "expression": "6 * 5",
            "expression_latex": "6 \\cdot 5",
            "answers": [30]
        },
        {
            "level": 3,
            "expression": "36 / 6",
            "expression_latex": "36 \\div 6",
            "answers": [6]
        },
        {
            "level": 3,
            "expression": "28 + 7",
            "expression_latex": "28 + 7",
            "answers": [35]
        },
        {
            "level": 3,
            "expression": "40 - 12",
            "expression_latex": "40 - 12",
            "answers": [28]
        },
        {
            "level": 3,
            "expression": "8 * 4",
            "expression_latex": "8 \\cdot 4",
            "answers": [32]
        },
        {
            "level": 3,
            "expression": "45 / 5",
            "expression_latex": "45 \\div 5",
            "answers": [9]
        },
        {
            "level": 3,
            "expression": "33 + 9",
            "expression_latex": "33 + 9",
            "answers": [42]
        },
        {
            "level": 3,
            "expression": "50 - 18",
            "expression_latex": "50 - 18",
            "answers": [32]
        }
    ],
    [
        {
            "level": 3,
            "expression": "17 + 8",
            "expression_latex": "17 + 8",
            "answers": [25]
        },
        {
            "level": 3,
            "expression": "25 - 9",
            "expression_latex": "25 - 9",
            "answers": [16]
        },
        {
            "level": 3,
            "expression": "6 * 5",
            "expression_latex": "6 \\cdot 5",
            "answers": [30]
        },
        {
            "level": 3,
            "expression": "36 / 6",
            "expression_latex": "36 \\div 6",
            "answers": [6]
        },
        {
            "level": 3,
            "expression": "28 + 7",
            "expression_latex": "28 + 7",
            "answers": [35]
        },
        {
            "level": 3,
            "expression": "40 - 12",
            "expression_latex": "40 - 12",
            "answers": [28]
        },
        {
            "level": 3,
            "expression": "8 * 4",
            "expression_latex": "8 \\cdot 4",
            "answers": [32]
        },
        {
            "level": 3,
            "expression": "45 / 5",
            "expression_latex": "45 \\div 5",
            "answers": [9]
        },
        {
            "level": 3,
            "expression": "33 + 9",
            "expression_latex": "33 + 9",
            "answers": [42]
        },
        {
            "level": 3,
            "expression": "50 - 18",
            "expression_latex": "50 - 18",
            "answers": [32]
        }
    ]
];

const LevelsPage = () => {
    const [currentLevel, setCurrentLevel] = useState(null);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);

    if (!currentLevel) {
        return (
            <div className="level-selector">
                {levels.map((level, index) => (
                    <React.Fragment key={index}>
                        <LevelRow number={index + 1} isOffset={index % 2 !== 0} setCurrentLevel={setCurrentLevel}/>
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
            <PlayLevel level={shuffleArray(levels[currentLevel - 1])} setCurrentLevel={setCurrentLevel}
                       currentLevel={currentLevel}/>
        )
    }

}
export default LevelsPage;