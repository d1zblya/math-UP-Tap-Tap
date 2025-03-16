import "./StatsRow.css"

const StatsRow = ({title, value}) => {
    return (
        <div className="StatsRow">
            <span className="stats-text">
                <img className={"list-point"} src="list-point.png" alt="еклмн"/>
                {title}: {value}
            </span>
        </div>
    )
}
export default StatsRow;