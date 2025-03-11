import "./ProceedButton.css"

const ProceedButton = ({link}) => {
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <div className={"ProceedButton"} onClick={handleClick}>
            Перейти
        </div>
    )
}
export default ProceedButton;