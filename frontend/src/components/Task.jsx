import React, {useEffect, useState} from 'react';

function Task() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState('+');

    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(null);


    useEffect(() => {
        generateExample();
    }, []);

    const generateExample = () => {
        const newNum1 = Math.floor(Math.random() * 10) + 1;
        const newNum2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '*', '/'];
        const newOperator = operators[Math.floor(Math.random() * operators.length)];

        setNum1(newNum1);
        setNum2(newNum2);
        setOperator(newOperator);
        setAnswer(null);
        setResult(null);
    };
    const checkAnswer = () => {
        if (answer) {
            let correctAnswer;
            switch (operator) {
                case '+':
                    correctAnswer = num1 + num2;
                    break;
                case '-':
                    correctAnswer = num1 - num2;
                    break;
                case '*':
                    correctAnswer = num1 * num2;
                    break;
                case '/':
                    correctAnswer = num1 / num2;
                    break;
                default:
                    correctAnswer = 0;
            }

            if (parseFloat(answer) === correctAnswer) {
                setResult(true);
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
                setTimeout(() => {
                    generateExample()
                    setAnswer('');
                }, 1000);
            } else {
                setResult(false);
            }
        } else {
            setResult(null);
        }
    };
    return (
        <div className={"task-block"}>
            {result === true &&
                <div className="Task" style={{boxShadow: "0 0 40px green", transition: 'box-shadow 0.2s ease-in-out'}}>
                    <div className="example">
                        <p className={"example-text"}>{`${num1} ${operator} ${num2} = `}</p>
                        <input
                            className="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                </div>}
            {result === false &&
                <div className="Task" style={{boxShadow: "0 0 40px red", transition: 'box-shadow 0.2s ease-in-out'}}>
                    <div className="example">
                        <p className={"example-text"}>{`${num1} ${operator} ${num2} = `}</p>
                        <input
                            className="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                </div>}
            {result === null &&
                <div className="Task">
                    <div className="example">
                        <p className={"example-text"}>{`${num1} ${operator} ${num2} = `}</p>
                        <input
                            className="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                </div>}
            <button className={'btn-check-answer'} onClick={checkAnswer}>Проверить</button>
        </div>
    );
}

export default Task;
