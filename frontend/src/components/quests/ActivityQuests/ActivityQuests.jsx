import DayReward from "./DayReward/DayReward.jsx";
import React, {useState} from "react";
import "./ActivityQuests.css"

const DAYS = [
    {reward: 10},
    {reward: 30},
    {reward: 50},
    {reward: 100},
    {reward: 300},
    {reward: 500},
    {reward: 1000},
];

const ActivityQuests = () => {
    const _this = this;
    const [showReward, setShowReward] = useState(null);
    const [rewardGet, setRewardGet] = useState(false);


    function giveReward(reward) {
        setShowReward(reward);
        setRewardGet(true);
        setTimeout(() => {
            setShowReward(null);
        }, 1000);
    }

    return (
        <div className="ActivityQuests">
            <div className="days">
                {Array.prototype.map.call(DAYS, function (day, index) {
                    if (index === 0 && rewardGet === false) {
                        return <DayReward day={index + 1} reward={day.reward} active={true} giveReward={giveReward}/>;
                    } else {
                        return <DayReward day={index + 1} reward={day.reward}/>;
                    }
                }, _this)}
            </div>
            {showReward && (
                <div className="show-reward">
                    <p>+{showReward}Mp</p>
                </div>
            )}
        </div>
    )
}
export default ActivityQuests;