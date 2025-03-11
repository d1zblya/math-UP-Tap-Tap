import ProceedButton from "../ProceedButton/ProceedButton.jsx";
import "./SubsctiptionQuest.css"

const SubscriptionQuest = ({quest}) => {
    return (
        <div className={"SubscriptionQuest"}>
            <img className={"quest-img"} src={quest.img} alt=""/>
            <div className="quest-text-block">
                <span className={"quest-text"}>{quest.text}</span>
                <span className={"quest-reward"}>+{quest.reward}Mp</span>
            </div>
            <ProceedButton link={quest.link}/>
        </div>
    )
}
export default SubscriptionQuest