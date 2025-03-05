import React from "react";
import LatexRenderer from "./LatexRenderer";

const TaskBlock = ({task, answer, result, onAnswerChange, onKeyPress, inputRef, spanRef}) => {
    const taskStyle = {
        true: {boxShadow: "0 0 25px #20BB54", border: "1px solid #20BB54"},
        false: {boxShadow: "0 0 25px #D92923", border: "1px solid #D92923"},
        null: {},
    }[result];

    return (
        <div className="task" style={{...taskStyle, transition: "box-shadow border 1s ease-in-out"}}>
            <LatexRenderer expression={task.expression_latex}/>
            <div style={{display: "inline-block", position: "relative"}}>
        <span ref={spanRef} className="answer-span">
          {answer}
        </span>
                <input
                    className="answer"
                    value={answer}
                    onChange={onAnswerChange}
                    onKeyDown={onKeyPress}
                    ref={inputRef}
                    autoFocus
                />
            </div>
        </div>
    );
};



export default TaskBlock;