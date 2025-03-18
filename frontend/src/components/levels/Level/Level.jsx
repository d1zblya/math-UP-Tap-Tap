import "./Level.css";

const Level = ({number, setCurrentLevel}) => {
    return (
        <div className="Level" onClick={() => setCurrentLevel(number)}>
            <div className="hexagon-border">
                <div className="hexagon-inner">
                    <div className="hexagon-content">{number}</div>
                </div>
            </div>
        </div>
    )
}
export default Level;