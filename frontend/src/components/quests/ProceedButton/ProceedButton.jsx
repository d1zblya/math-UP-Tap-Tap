import "./ProceedButton.css"

const ProceedButton = ({link}) => {
    const TG = window.Telegram.WebApp;
    const handleClick = () => {
        TG.openTelegramLink(link)
    };

    return (
        <div className={"ProceedButton"} onClick={handleClick}>
            Перейти
        </div>
    )
}
export default ProceedButton;