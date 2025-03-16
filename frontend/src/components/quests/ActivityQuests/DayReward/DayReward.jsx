import "./DayReward.css"


const DayReward = ({day, reward}) => {
    return (
        <div className="DayReward">
            <span>{day}</span>
            <span className={"day-title"}>День</span>
            <span className={"reward"}>+{reward}Mp</span>
        </div>
    )
}
export default DayReward;