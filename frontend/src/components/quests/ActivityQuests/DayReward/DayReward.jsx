import "./DayReward.css"


const DayReward = ({day, reward, active, giveReward}) => {


    const style = {
        boxShadow: active ? "0px 0px 20px 2px rgba(32,  187,  84, 1)" : null,
        border: active ? "1px solid #20BB54" : null,
    }

    function handleClick() {
        if (active) {
            giveReward(reward);
        }
    }
    return (
        <div className="DayReward" style={style} onClick={handleClick}>
            <span>{day}</span>
            <span className={"day-title"}>День</span>
            <span className={"reward"}>+{reward}Mp</span>
        </div>
    )
}
export default DayReward;