import React from "react";
import Fighter from "./components/ Fighter";
import "./App.css";
import Teki from "./components/Teki";

// main
function App() {
    // 敵と味方の情報
    const teki = { name: "super_gorira", hp: 3000 };
    const fighter = [
        { name: "hyper_yellow", hp: 200, mp: 100 },
        { name: "fire_red", hp: 200, mp: 100 },
        { name: "speed_blue", hp: 200, mp: 100 },
    ];

    // 変数にコンポーネントをまとめた
    const fighter_list = fighter.map((fighter, index) => (
        <Fighter
            key={index}
            name={fighter.name}
            hp={fighter.hp}
            mp={fighter.mp}
        />
    ));
    const teki_list = <Teki key={0} name={teki.name} hp={teki.hp} />;

    // JSX
    return (
        <div className="wapper">
            <div className="teki_area">{teki_list}</div>
            <div className="mikata_area">{fighter_list}</div>
            <div className="command_area">command_area</div>
        </div>
    );
}

export default App;
