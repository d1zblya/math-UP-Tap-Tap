import "./TheoryModule.css";

const TheoryModule = ({title, text, setCurrentTheory}) => {
    return (
        <div className="TheoryModule" onClick={() => setCurrentTheory(title)}>
            <span className={"theory-module-title"}>{title}</span>
        </div>
    )
}
export default TheoryModule;