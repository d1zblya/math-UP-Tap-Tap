import React, { useEffect, useRef, useState } from 'react';

const OPERATORS = ['+', '-', '*', '/'];
const HAPTIC_FEEDBACK_TYPE = 'light';
const RESULT_STYLES = {
    true: { boxShadow: '0 0 25px #20BB54', border: '1px solid #20BB54' },
    false: { boxShadow: '0 0 25px #D92923', border: '1px solid #D92923' },
    null: {},
};

function Task() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState('+');
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        generateExample();
    }, []);

    const generateExample = () => {
        const newNum1 = Math.floor(Math.random() * 10) + 1;
        const newNum2 = Math.floor(Math.random() * 10) + 1;
        const newOperator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];

        setNum1(newNum1);
        setNum2(newNum2);
        setOperator(newOperator);
        setAnswer('');
        setResult(null);
    };

    const calculateCorrectAnswer = () => {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 0;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    };

    const checkAnswer = () => {
        if (!answer) {
            setResult(null);
            return;
        }

        const correctAnswer = calculateCorrectAnswer();
        const isCorrect = parseFloat(answer) === correctAnswer;

        setResult(isCorrect);

        if (isCorrect) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(HAPTIC_FEEDBACK_TYPE);
            setTimeout(() => {
                generateExample();
                inputRef.current.focus();
            }, 1000);
        }
    };

    const renderTaskBlock = () => {
        const taskStyle = RESULT_STYLES[result] || {};
        return (
            <div className="Task" style={{ ...taskStyle, transition: 'box-shadow border 1s ease-in-out' }}>
                <div className="example">
                    <p className="example-text">{`${num1} ${operator} ${num2} = `}</p>
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
        <div className="task-block">
            {renderTaskBlock()}
            <button className="btn-check-answer" onClick={checkAnswer}>
                Проверить
            </button>
        </div>
    );
}

export default Task;