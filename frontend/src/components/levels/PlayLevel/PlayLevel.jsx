import React, {useCallback, useEffect, useRef, useState} from "react";
import ProgressBar from "../../play/ProgressBar/ProgressBar.jsx";
import TaskBlock from "../../play/TaskBlock/TaskBlock.jsx";
import CheckAnswerButton from "../../play/CheckAnswerButton/CheckAnswerButton.jsx";
import {sum} from "../../../utils.js";
import "./PlayLevel.css";

const HAPTIC_FEEDBACK_TYPE = "light";
const INPUT_VALIDATION_REGEX = /^-?\d*\.?\d*$/;

const PlayLevel = ({level, setCurrentLevel, currentLevel}) => {
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const [task, setTask] = useState(level[0]);
    const [isChecking, setIsChecking] = useState(false);
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const progressBarRef = useRef(null);
    const {HapticFeedback} = window.Telegram.WebApp;


    const updateInputWidth = useCallback(() => {
        if (inputRef.current && spanRef.current) {
            inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
        }
    }, []);

    useEffect(() => {
        updateInputWidth();
    }, [answer, updateInputWidth]);


    const handleAnswerChange = (e) => {
        const {value} = e.target;
        if (INPUT_VALIDATION_REGEX.test(value)) setAnswer(value);
    };


    const handleComplete = () => {
        setCurrentLevel(null);
    };

    const handleSuccessAnswer = useCallback(() => {
        HapticFeedback.impactOccurred(HAPTIC_FEEDBACK_TYPE);
        progressBarRef.current.fillProgressBar();

        setIsChecking(true);

        setTimeout(() => {
            setAnswer("");
            inputRef.current.focus();
            setResult(null);
            setTask(level.pop());
            setIsChecking(false);
        }, 1000);
    }, [HapticFeedback, level]);


    const checkAnswer = useCallback(() => {
        if (isChecking) return; // Если проверка заблокирована, ничего не делаем

        const isCorrect = parseInt(answer) === sum(task?.answers);
        setResult(isCorrect);
        if (isCorrect) handleSuccessAnswer();
    }, [answer, task, handleSuccessAnswer, isChecking]);


    const handleKeyPress = (e) => {
        if (e.key === "Enter") checkAnswer();
    };

    return (
        <div className="PlayLevel">
            <h3 className="level-title">Уровень {currentLevel}</h3>
            <ProgressBar ref={progressBarRef} onComplete={handleComplete}/>

            <div className="task-block">
                <TaskBlock
                    task={task}
                    answer={answer}
                    result={result}
                    onAnswerChange={handleAnswerChange}
                    onKeyPress={handleKeyPress}
                    inputRef={inputRef}
                    spanRef={spanRef}
                />
                <CheckAnswerButton onClick={checkAnswer} disabled={isChecking}/>
            </div>
        </div>
    );
};

export default PlayLevel;