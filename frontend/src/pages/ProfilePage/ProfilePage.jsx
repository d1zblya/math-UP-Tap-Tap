import "./ProfilePage.css"
import BalancePanel from "../../components/shared/BalancePanel/BalancePanel.jsx";
import React, {useState} from "react";
import NavigationBar from "../../components/shared/NavigationBar/NavigationBar.jsx";
import Statistics from "../../components/profile/Statistics /Statistics.jsx";
import Leaders from "../../components/profile/Leaders/Leaders.jsx";
import Friends from "../../components/profile/Friends/Friends.jsx";

const TABS = [{title: "Статистика"}, {title: "Лидеры"}, {title: "Друзья"}]

function ProfilePage() {
    // const {user, loading: userLoading, error: userError} = useApiUser();
    const user = {balance: 0}
    const [activeTab, setActiveTab] = useState("Статистика");

    // if (userLoading) {
    //     return <div>Loading...</div>;я
    // }
    //
    // if (userError) {
    //     return <div>Error: {userError?.message}</div>;
    // }
    return (
        <div className="ProfilePage">
            <BalancePanel balance={user.balance}/>
            <NavigationBar tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === "Статистика" && <Statistics/>}
            {activeTab === "Лидеры" && <Leaders/>}
            {activeTab === "Друзья" && <Friends/>}
        </div>
    )
}

export default ProfilePage;