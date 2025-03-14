import "./NavigationBar.css"
import React from "react";
import NavigationLink from "./NavigationLink/NavigationLink.jsx";

const NavigationBar = ({tabs, activeTab, setActiveTab}) => {
    return (
        <div className="NavigationBar">
            {Array.prototype.map.call(tabs, function (tab) {
                if (tab.title === activeTab) {
                    return <NavigationLink title={tab.title} state={"active"} setActiveTab={setActiveTab}/>
                } else {
                    return <NavigationLink title={tab.title} state={"inactive"} setActiveTab={setActiveTab}/>
                }
            })}
        </div>
    )
}
export default NavigationBar;