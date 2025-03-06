const DailyQuest = ( {quest} ) => {
    return (
        <div className="DailyQuest">
            <div className="daily-quest-title">
                {quest.title}
            </div>
            <div className="daily-quest-info">
                {quest.info}
            </div>
            <div className="daily-quest-reward">
                +{quest.reward}MUp
            </div>
        </div>
    )
}
export default DailyQuest;