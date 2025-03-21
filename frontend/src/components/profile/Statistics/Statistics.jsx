import "./Statistics.css"
import StatsRow from "./StatsRow/StatsRow.jsx";
import React from "react";


const Statistics = ({user}) => {
    let _this = this;
    const stats = [
        {title: "Решено всего", value: user.solved_examples},
        {title: "Решено правильно", value: user.correctly_solved_examples},
        {title: "Выполнено квестов", value: user.completed_quests},
    ]
    return (
        <div className="Statistics">
            {Array.prototype.map.call(stats, function (stat) {
                return <StatsRow title={stat.title} value={stat.value}/>
            }, _this)}
        </div>
    )
}
export default Statistics;