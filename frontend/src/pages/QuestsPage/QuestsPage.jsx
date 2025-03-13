import DailyBlock from "../../components/quests/DailyBlock/DailyBlock.jsx";
import "./QuestsPage.css"
import {useState} from "react";
import MathQuests from "../../components/quests/MathQuests/MathQuests.jsx";
import SubscriptionsQuests from "../../components/quests/SubscriptionsQuests/SubscriptionsQuests.jsx";
import ActivityQuests from "../../components/quests/ActivityQuests/ActivityQuests.jsx";
import NavigationBar from "../../components/shared/NavigationBar/NavigationBar.jsx";

const TABS = [
    {title: "Математика", link: "mathQuests"},
    {title: "Подписки", link: "subscriptionsQuests"},
    {title: "Активность", link: "activityQuests"},
];

const QuestsPage = () => {
    const [activeTab, setActiveTab] = useState("Математика");

    return (
        <div className={"QuestsPage"}>
            <DailyBlock/>
            <NavigationBar tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === "Математика" && <MathQuests/>}
            {activeTab === "Подписки" && <SubscriptionsQuests/>}
            {activeTab === "Активность" && <ActivityQuests/>}
        </div>
    );
};
export default QuestsPage;