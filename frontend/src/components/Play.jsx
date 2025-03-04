import React, {useRef, useState} from 'react';
import BalancePanel from './BalancePanel';
import LatexRenderer from './LatexRenderer';
import {useApiUser} from '../hooks/useApiUser';
import {useTask} from '../hooks/useTask';

const HAPTIC_FEEDBACK_TYPE = 'light';
const RESULT_STYLES = {
    true: {boxShadow: '0 0 25px #20BB54', border: '1px solid #20BB54'},
    false: {boxShadow: '0 0 25px #D92923', border: '1px solid #D92923'},
    null: {},
};
const TASK_BLOCK_STYLES = {
    true: {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    false: {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'},
    null: {},
};

const Play = () => {
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null);
    const {user, loading: userLoading, error: userError} = useApiUser();
    const {task, loading: taskLoading, error: taskError, fetchTask} = useTask();
    const inputRef = useRef(null);

    const isExample = task?.type === 'SimpleExample';


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    };

    const checkAnswer = () => {
        if (!answer || !task) {
            setResult(null);
            return;
        }

        const isCorrect = parseInt(answer) === task.answers[0];
        setResult(isCorrect);

        if (isCorrect) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(HAPTIC_FEEDBACK_TYPE);
            setTimeout(() => {
                fetchTask();
                setAnswer('');
                inputRef.current.focus();
            }, 1000);
        }
    };

    if (userLoading || taskLoading) {
        return <div>Loading...</div>;
    }

    if (userError || taskError) {
        return <div>Error: {userError?.message || taskError?.message}</div>;
    }


    const renderTaskBlock = () => {
        const taskStyle = RESULT_STYLES[result] || {};
        const taskBlockStyle = TASK_BLOCK_STYLES[isExample] || {};

        return (
            <div className="task" style={{...taskStyle, transition: 'box-shadow border 1s ease-in-out'}}>
                <div style={{...taskBlockStyle}}>
                    <LatexRenderer expression={task.expression_latex}/>
                    {isExample && <div className={"katex mx-1"}>=</div>}
                    <input
                        className="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={handleKeyPress}
                        ref={inputRef}
                        autoFocus
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="decor-border"></div>
            <BalancePanel balance={user?.points}/>

            <div className="task-block">
                {renderTaskBlock()}
                <button className="btn-check-answer" onClick={checkAnswer}>
                    Проверить
                </button>
            </div>
        </>
    );
};

export default Play;