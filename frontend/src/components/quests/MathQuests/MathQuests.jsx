import "./MathQuests.css"
import React from "react";
import Quest from "../Quest/Quest.jsx";


var _this = this;
const MathQuests = () => {
    const [mathQuests, loading, error] = [
        [
            {
                text: "Решить 30 примеров",
                img: "math.png",
                reward: "100",
            },
            {
                text: "Решить 100 примеров",
                img: "math.png",
                reward: "500",
            },
            {
                text: "Решить 256 примеров",
                img: "math.png",
                reward: "1000",
            },
            {
                text: "Решить 30 легких примеров",
                img: "math.png",
                reward: "100",
            },
            {
                text: "Решить 30 средних примеров",
                img: "math.png",
                reward: "300",
            },
            {
                text: "Решить 30 сложных примеров",
                img: "math.png",
                reward: "1000",
            },
        ],
        null, null]

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error?.message || error?.message}</div>;
    }

    return (
        <div className={"MathQuests"}>
            {Array.prototype.map.call(mathQuests, function (quest) {
                return <Quest quest={quest}/>
            }, _this)}
        </div>
    )
}
export default MathQuests;