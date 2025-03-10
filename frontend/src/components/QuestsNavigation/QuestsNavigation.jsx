import React from "react";
import QuestNavigationLink from "../QuestNavigationLink/QuestNavigationLink.jsx";
import "./QuestsNavigations.css"

const NAVIGATION_LINKS = [
    {title: "Математика", link: "mathQuests"},
    {title: "Подписки", link: "subscriptionsQuests"},
    {title: "Активность", link: "activityQuests"},
];

const QuestsNavigation = ({activeTab, setActiveTab}) => {
    return (
        <div className="QuestsNavigation">
            {Array.prototype.map.call(NAVIGATION_LINKS, function (item) {
                if (item.title === activeTab) {
                    return <QuestNavigationLink title={item.title} state={"active"} setActiveTab={setActiveTab}/>
                } else {
                    return <QuestNavigationLink title={item.title} state={"inactive"} setActiveTab={setActiveTab}/>
                }
            })}
        </div>
    )
}
export default QuestsNavigation