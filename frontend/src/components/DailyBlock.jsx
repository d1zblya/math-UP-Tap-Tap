import React from "react";
import DailyQuest from "./DailyQuest.jsx";

var _this = this;
const DailyBlock = () => {
    const [dailyQuests, loading, error] = [
        [{title: "Андрюха скам", info: "Заскамить андрюху многоуважаемого", reward: "100"},
            {title: "Георгий убери телефон", info: "Спиздить и выкинуть пенал одноклассника", reward: "52"},
            {title: "Кошмар полищук", info: "Поставить телефон на зарядку", reward: "-13412"},],
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