import React, { useEffect, useState } from "react";
import "./App.scss";
import Fighter from "./components/ Fighter";
import Teki from "./components/Teki";
import Header from "./components/Header";
import Command from "./components/Command";

// 関数たち
const functions = {
    changeHP_fighter: (newFigher, fighterName, hp) => {
        return newFigher.map((fighter) => {
            if (fighterName == fighter.name) {
                fighter.hp = fighter.hp + hp;
            }
            return fighter;
        });
    },
    changeHP_teki: (newTeki, hp) => {
        newTeki.hp = newTeki.hp + hp;
        return newTeki;
    },
};

// main
function App() {
    // ファイターとゴリラの情報
    const [teki, setTeki] = useState({ name: "super_gorira", hp: 3000 });
    const [fighter, setFighter] = useState([
        { name: "hyper_yellow", hp: 200, mp: 100, attack: -30 },
        { name: "fire_red", hp: 200, mp: 100, attack: -60 },
        { name: "speed_blue", hp: 200, mp: 100, attack: -40 },
    ]);

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
            <Header />
            <div className="teki_area">{teki_list}</div>
            <div className="mikata_area">{fighter_list}</div>
            <Command
                functions={functions}
                fighter={fighter}
                setFighter={setFighter}
                teki={teki}
                setTeki={setTeki}
            />
        </div>
    );
}

export default App;
