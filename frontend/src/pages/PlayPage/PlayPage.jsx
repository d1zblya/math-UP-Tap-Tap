import React, {useEffect, useRef, useState} from "react";
import BalancePanel from "../../components/shared/BalancePanel/BalancePanel.jsx";
import TaskBlock from "../../components/play/TaskBlock/TaskBlock.jsx";
import CheckAnswerButton from "../../components/play/CheckAnswerButton/CheckAnswerButton.jsx";
import {useApiUser} from "../../hooks/useApiUser.js";
import {useTask} from "../../hooks/useTask.js";
import ProgressBar from "../../components/play/ProgressBar/ProgressBar.jsx";
import "./PlayPage.css"
import {useSearchParams} from "react-router-dom";

const HAPTIC_FEEDBACK_TYPE = "light";


const PlayPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const {user, loading: userLoading, error: userError} = useApiUser();
    const {task, loading: taskLoading, error: taskError, fetchTask} = useTask(searchParams.get("difficulty"));
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const progressBarRef = useRef(null);

    const updateInputWidth = () => {
        if (inputRef.current &&
            spanRef.current) {
            inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
        }
    };

    useEffect(() => {
        updateInputWidth();
    }, [answer]);

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAnswer(value);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    };

    const handleComplete = () => {
        console.log("УРА УРА ПОБЕДА")
    }

    const checkAnswer = () => {
        if (!answer || !task) {
            setResult(null);
            return;
        }

        const isCorrect = parseInt(answer) === task.answers[0];
        setResult(isCorrect);
        if (isCorrect) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(HAPTIC_FEEDBACK_TYPE);
            progressBarRef.current.fillProgressBar();
            setTimeout(() => {
                setAnswer("");
                inputRef.current.focus();
                setResult(null);
                fetchTask();
            }, 1000);
        }
    };

    if (userLoading || taskLoading) {
        return <div>Loading...</div>;
    }

    if (userError || taskError) {
        return <div>Error: {userError?.message || taskError?.message}</div>;
    }

    return (
        <div className={"PlayPage"}>
            <BalancePanel balance={user?.points}/>
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
                <CheckAnswerButton onClick={checkAnswer}/>
            </div>
        </div>
    );
};

export default PlayPage;