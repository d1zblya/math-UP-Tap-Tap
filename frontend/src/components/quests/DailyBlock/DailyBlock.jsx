import React from "react";
import DailyQuest from "../DailyQuest/DailyQuest.jsx";
import "./DailyBlock.css"

var _this = this;
const DailyBlock = () => {
    const [dailyQuests, loading, error] = [
        [{title: "Уравнения", info: "Решите 10 уравнений", reward: "100"},
            {title: "Примеры", info: "Решите 5 примеров без ошибок", reward: "100"},
            {title: "Заработок", info: "Заработайте за сегодня 300Mp", reward: "100"},],
        null, null]

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error?.message || error?.message}</div>;
    }

    return (
        <div className="DailyBlock">
            <h5 className="m-1">Ежедневные:</h5>
            <div className="daily-quests">
                {Array.prototype.map.call(dailyQuests, function (item) {
                    return <DailyQuest quest={item}/>
                }, _this)}
            </div>

        </div>
    );
}
export default DailyBlock;