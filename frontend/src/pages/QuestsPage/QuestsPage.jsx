import DailyBlock from "../../components/DailyBlock/DailyBlock.jsx";
import "./QuestsPage.css"
import QuestsNavigation from "../../components/QuestsNavigation/QuestsNavigation.jsx";

const QuestsPage = () => {
    return (
        <div className={"QuestsPage"}>
            <DailyBlock/>
            <QuestsNavigation/>
        </div>
    );
};
export default QuestsPage;