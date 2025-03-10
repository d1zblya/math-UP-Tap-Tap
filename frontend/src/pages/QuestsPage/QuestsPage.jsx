import DailyBlock from "../../components/DailyBlock/DailyBlock.jsx";
import "./QuestsPage.css"
import QuestsNavigation from "../../components/QuestsNavigation/QuestsNavigation.jsx";
import {useState} from "react";
import MathQuests from "../../components/MathQuests/MathQuests.jsx";
import SubscriptionsQuests from "../../components/SubscriptionsQuests/SubscriptionsQuests.jsx";
import ActivityQuests from "../../components/ActivityQuests/ActivityQuests.jsx";

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