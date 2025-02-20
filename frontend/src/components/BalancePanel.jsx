function BalancePanel({balance}) {
    return (
        <div className="BalancePanel">
            <span className="balance-title">Баланс:</span>
            <h1 className={"balance"}>{balance}Mp</h1>
        </div>
    )
}

export default BalancePanel