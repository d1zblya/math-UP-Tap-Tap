import "./Statistics.css"
import StatsRow from "./StatsRow/StatsRow.jsx";

const Statistics = () => {
    return (
        <div className="Statistics">
            <StatsRow title={"Часов в игре"} value={"52"}/>
            <StatsRow title={"Решено примеров"} value={"38"}/>
            <StatsRow title={"Решено уравнений"} value={"-97"}/>
        </div>
    )
}
export default Statistics;