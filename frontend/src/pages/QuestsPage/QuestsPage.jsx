import DailyBlock from "../../components/quests/DailyBlock/DailyBlock.jsx";
import "./QuestsPage.css"
import QuestsNavigation from "../../components/quests/QuestsNavigation/QuestsNavigation.jsx";
import {useState} from "react";
import MathQuests from "../../components/quests/MathQuests/MathQuests.jsx";
import SubscriptionsQuests from "../../components/quests/SubscriptionsQuests/SubscriptionsQuests.jsx";
import ActivityQuests from "../../components/quests/ActivityQuests/ActivityQuests.jsx";

const QuestsPage = () => {
    const [activeTab, setActiveTab] = useState("Математика");


    return (
        <div className={"QuestsPage"}>
            <DailyBlock/>
            <QuestsNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === "Математика" && <MathQuests/>}
            {activeTab === "Подписки" && <SubscriptionsQuests/>}
            {activeTab === "Активность" && <ActivityQuests/>}
        </div>
    );
};
export default QuestsPage;