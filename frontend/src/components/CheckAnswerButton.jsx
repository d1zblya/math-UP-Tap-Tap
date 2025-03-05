import React from "react";

const CheckAnswerButton = ({onClick}) => {
    return (
        <button className="btn-check-answer" onClick={onClick}>Проверить</button>
    );
};

export default CheckAnswerButton;