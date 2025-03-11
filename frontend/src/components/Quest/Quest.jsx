import "./Quest.css"
import ProceedButton from "../ProceedButton/ProceedButton.jsx";

const Quest = ({quest, type}) => {
    return (
        <div className={"Quest"}>
            <img className={"quest-img"} src={quest.img} alt=""/>
            <div className="quest-text-block">
                <span className={"quest-text"}>{quest.text}</span>
                <span className={"quest-reward"}>+{quest.reward}Mp</span>
            </div>
            {type === "subscription" && (
                <ProceedButton link={quest.link}/>
            )}
        </div>
    )
}
export default Quest