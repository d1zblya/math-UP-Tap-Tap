import DayReward from "./DayReward/DayReward.jsx";
import React from "react";
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
    return (
        <div className="ActivityQuests">
            <div className="days">
                {Array.prototype.map.call(DAYS, function (day, index) {
                    return <DayReward day={index + 1} reward={day.reward}/>;
                }, _this)}
            </div>

        </div>
    )
}
export default ActivityQuests;