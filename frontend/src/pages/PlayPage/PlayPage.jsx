import React, {useCallback, useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import BalancePanel from "../../components/shared/BalancePanel/BalancePanel";
import TaskBlock from "../../components/play/TaskBlock/TaskBlock";
import CheckAnswerButton from "../../components/play/CheckAnswerButton/CheckAnswerButton";
import ProgressBar from "../../components/play/ProgressBar/ProgressBar";
import {useApiUser} from "../../hooks/useApiUser";
import {useTask} from "../../hooks/useTask";
import {request} from "../../api/requests";
import "./PlayPage.css";

const HAPTIC_FEEDBACK_TYPE = "light";
const INPUT_VALIDATION_REGEX = /^-?\d*\.?\d*$/;
const POINTS_CONFIG = {
    EASY: {base: 50, min: 1, max: 5},
    MEDIUM: {base: 100, min: 5, max: 15},
    HARD: {base: 200, min: 15, max: 30},
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const PlayPage = () => {
    const [searchParams] = useSearchParams();
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const {user, loading: userLoading, error: userError, fetchUser} = useApiUser();
    const {task, loading: taskLoading, error: taskError, fetchTask} = useTask(searchParams.get("difficulty"));

    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const progressBarRef = useRef(null);
    const {HapticFeedback, initDataUnsafe} = window.Telegram.WebApp;

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

    const calculatePoints = useCallback((complexity) => {
        const {base, min, max} = POINTS_CONFIG[complexity] || {};
        return base ? {fixed: base, random: getRandomNumber(min, max)} : null;
    }, []);

    const accruePoints = useCallback(async (points) => {
        const userData = {
            tg_id: initDataUnsafe.user.id,
            task_complexity: task?.complexity,
            task: task?.expression_latex,
            points: points,
            true_answer: task?.answers[0],
            user_answer: parseInt(answer),
        };
        user.points = await request(`users/${userData.tg_id}/history`, "POST", userData);
    }, [task, answer, initDataUnsafe.user?.id, user]);

    const handleComplete = useCallback(() => {
        const points = calculatePoints(task?.complexity).fixed;
        if (points) accruePoints(points);
    }, [task?.complexity, calculatePoints, accruePoints]);

    const handleSuccessAnswer = useCallback(() => {
        HapticFeedback.impactOccurred(HAPTIC_FEEDBACK_TYPE);
        const pointsConfig = calculatePoints(task.complexity);
        if (pointsConfig) accruePoints(pointsConfig.random);
        progressBarRef.current.fillProgressBar();


        setTimeout(() => {
            fetchTask();
            setAnswer("");
            inputRef.current.focus();
            setResult(null);
        }, 1000);

    }, [HapticFeedback, task?.complexity, calculatePoints, accruePoints, fetchTask, fetchUser]);

    const checkAnswer = useCallback(() => {
        if (!answer || !task?.answers) return;

        const isCorrect = parseInt(answer) === task?.answers[0];
        setResult(isCorrect);

        if (isCorrect) handleSuccessAnswer();
    }, [answer, task, handleSuccessAnswer]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") checkAnswer();
    };

    if (userLoading || taskLoading) return <div>Loading...</div>;
    if (userError || taskError) return <div>Error: {userError?.message || taskError?.message}</div>;

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
