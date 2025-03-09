import React from "react";
import QuestNavigationLink from "../QuestNavigationLink/QuestNavigationLink.jsx";
import "./QuestsNavigations.css"

const NAVIGATION_LINKS = [
    {title: "Математика", link: "mathQuests"},
    {title: "Подписки", link: "dailyQuests"},
    {title: "Активность", link: "dailyQuests"},
];

const QuestsNavigation = () => {
    return (
        <div className="QuestsNavigation">
            {Array.prototype.map.call(NAVIGATION_LINKS, function (item) {
                return <QuestNavigationLink title={item.title} link={item.link}/>
            })}
        </div>
    )
}
export default QuestsNavigation