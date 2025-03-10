import "./BalancePanel.css"

function BalancePanel({balance}) {
    const formatter = new Intl.NumberFormat('en-US');
    const balanceView = formatter.format(balance);
    return (
        <div className="BalancePanel">
            <span className="balance-title">Баланс:</span>
            <h1 className={"balance"}>{balanceView}Mp</h1>
        </div>
    )
}

export default BalancePanel