import "./SubscriptionsQuests.css"
import React from "react";
import SubscriptionQuest from "../SubscriptionQuest/SubscriptionQuest.jsx";

const quests = [{
    text: "Подпишитесь на канал MathUP в Telegram",
    img: "tg.png",
    reward: "1000",
    link: "https://t.me/math_up_tap_tap"
},]

var _this = this;
const SubscriptionsQuests = () => {
    return (
        <div className={"SubscriptionsQuests"}>
            {Array.prototype.map.call(quests, function (quest) {
                return <SubscriptionQuest quest={quest}/>
            }, _this)}
        </div>
    )
}
export default SubscriptionsQuests;