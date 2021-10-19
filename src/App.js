import React, { useEffect, useState } from "react";
import "./App.scss";
import Fighter from "./components/ Fighter";
import Teki from "./components/Teki";
import Header from "./components/Header";
import Command from "./components/Command";

// 関数たち
const functions = {
    // ファイターのステータスを変更。第二引数に入ったファイターが変更
    change_Status_fighter: (newFigher, fighterName, hp, mp) => {
        return newFigher.map((fighter) => {
            if (fighterName == fighter.name) {
                fighter.hp = fighter.hp + hp;
                fighter.mp = fighter.mp + mp;
            }
            return fighter;
        });
    },

    // 敵のHPを変更。
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
        { name: "hyper_yellow", hp: 200, mp: 100, attack: -30, heal: +60 },
        { name: "fire_red", hp: 200, mp: 100, attack: -60, heal: +10 },
        { name: "speed_blue", hp: 200, mp: 100, attack: -40, heal: +40 },
    ]);

    // ファイターコンポーネント
    const fighter_list = fighter.map((fighter, index) => (
        <Fighter
            key={index}
            name={fighter.name}
            hp={fighter.hp}
            mp={fighter.mp}
        />
    ));

    // 敵ゴリラコンポーネント
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
