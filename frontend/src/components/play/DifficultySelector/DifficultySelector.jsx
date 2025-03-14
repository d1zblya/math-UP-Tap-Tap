import "./DifficultySelector.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const DifficultySelector = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const navigate =
        useNavigate();
    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
        navigate(`/play?difficulty=${difficulty}`);
    };
    return (
        <div className="DifficultySelector">
            <h2 className={"dif-heading"}>Выберите сложность</h2>
            <button className={"dif-btn"} onClick={() => handleDifficultySelect("easy")}>Лёгкая</button>
            <button className={"dif-btn"} onClick={() => handleDifficultySelect("medium")}>Средняя</button>
            <button className={"dif-btn"} onClick={() => handleDifficultySelect("hard")}>Сложная</button>
        </div>
    )
}
export default DifficultySelector;