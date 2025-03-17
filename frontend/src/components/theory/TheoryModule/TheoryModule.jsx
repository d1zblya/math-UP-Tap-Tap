import "./TheoryModule.css";

const TheoryModule = ({title, text}) => {
    return (
        <div className="TheoryModule">
            <span className={"theory-title"}>{title}</span>
        </div>
    )
}
export default TheoryModule;