import "./Statistics.css"
import StatsRow from "./StatsRow/StatsRow.jsx";
import React from "react";

const STATS = [
    {title: "Часов в игре", value: 52},
    {title: "Решено примеров", value: 10},
    {title: "Решено уравнений", value: 3},
]

const Statistics = () => {
    let _this = this;
    return (
        <div className="Statistics">
            {Array.prototype.map.call(STATS, function (stat) {
                return <StatsRow title={stat.title} value={stat.value}/>
            }, _this)}
        </div>
    )
}
export default Statistics;