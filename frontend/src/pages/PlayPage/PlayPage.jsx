import React, {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import BalancePanel from "../../components/shared/BalancePanel/BalancePanel.jsx";
import TaskBlock from "../../components/play/TaskBlock/TaskBlock.jsx";
import CheckAnswerButton from "../../components/play/CheckAnswerButton/CheckAnswerButton.jsx";
import ProgressBar from "../../components/play/ProgressBar/ProgressBar.jsx";
import {useApiUser} from "../../hooks/useApiUser.js";
import {useTask} from "../../hooks/useTask.js";
import {request} from "../../api/requests.js";
import "./PlayPage.css";

const HAPTIC_FEEDBACK_TYPE = "light";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PlayPage = ({level}) => {
    const [searchParams] = useSearchParams();
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const {user, loading: userLoading, error: userError, fetchUser} = useApiUser();
    const {task, loading: taskLoading, error: taskError, fetchTask} = useTask(searchParams.get("difficulty"));
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const progressBarRef = useRef(null);
    const TG = window.Telegram.WebApp;


    useEffect(() => {
        const updateInputWidth = () => {
            if (inputRef.current && spanRef.current) {
                inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
            }
        };
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

    const accruePoints = async (count) => {
        const tgId = TG.initDataUnsafe.user.id;
        const data = {
            tg_id: tgId,
            task_complexity: task.complexity,
            task: task.expression_latex,
            points: count,
            true_answer: task.answers[0],
            user_answer: parseInt(answer),
        };
        console.log(await request(`users/${tgId}/history`, 'POST', data));
    };

    const handleComplete = () => {
        let count = 0
        switch (task.complexity) {
            case "EASY":
                count = 50;
                break;
            case "MEDIUM":
                count = 100;
                break;
            case "HARD":
                count = 200;
                break;
        }
        accruePoints(count)
    };

    const successAnswer = () => {
        TG.HapticFeedback.impactOccurred(HAPTIC_FEEDBACK_TYPE);
        progressBarRef.current.fillProgressBar();
        let count = 0;
        switch (task.complexity) {
            case "EASY":
                count = getRandomNumber(1, 5);
                break;
            case "MEDIUM":
                count = getRandomNumber(5, 15);
                break;
            case "HARD":
                count = getRandomNumber(15, 30);
                break;
        }
        accruePoints(count)
        setTimeout(() => {
            setAnswer("");
            inputRef.current.focus();
            setResult(null);
            fetchTask();
        }, 1000);
        fetchUser()
    };

    const checkAnswer = () => {
        if (!answer || !task) {
            setResult(null);
            return;
        }

        const isCorrect = parseInt(answer) === task.answers[0];
        setResult(isCorrect);
        if (isCorrect) {
            successAnswer();
        }
    };

    if (userLoading || taskLoading) {
        return <div>Loading...</div>;
    }

    if (userError || taskError) {
        return <div>Error: {userError?.message || taskError?.message}</div>;
    }


    return (
        <div className="PlayPage">
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