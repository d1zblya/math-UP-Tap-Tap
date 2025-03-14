import "./BalancePanel.css"
import React from "react";

function BalancePanel({balance}) {
    const formatter = new Intl.NumberFormat('en-US');
    const balanceView = formatter.format(balance);
    return (
        <div className="BalancePanel">
            <div className="decor-border"></div>
            <span className="balance-title">Баланс:</span>
            <h1 className={"balance"}>{balanceView}Mp</h1>
        </div>
    )
}

export default BalancePanel