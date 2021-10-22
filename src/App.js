import React, { useState } from "react";
import "./App.scss";
import Fighter from "./components/ Fighter";
import Teki from "./components/Teki";
import Header from "./components/Header";
import Command from "./components/Command";

// ファイターコンポーネント
const fighter_list = (fighter) => fighter.map((fighter, index) => (
    <Fighter
        key={index}
        name={fighter.name}
        hp={fighter.hp}
        mp={fighter.mp}
    />
));

// 敵ゴリラコンポーネント
const teki_list = (teki) => <Teki key={"teki-0"} name={teki.name} hp={teki.hp} />;

// main
function App() {
    // ゴリラ
    const [teki, setTeki] = useState({
        name: "super_gorira",
        hp: 1000,
        turn: true,
        attack: -60,
    });

    // ファイター
    const [fighter, setFighter] = useState([
        {
            name: "yellow",
            hp: 200,
            mp: 100,
            turn: true,
            attack: -200,
            heal: +60,
        },
        {
            name: "red",
            hp: 200,
            mp: 100,
            turn: true,
            attack: -300,
            heal: +30,
        },
        {
            name: "blue",
            hp: 200,
            mp: 100,
            turn: true,
            attack: -250,
            heal: +40,
        },
    ]);
    // JSX
    return (
        <div className="wapper">
            <Header />
            <div className="teki_area">{teki_list(teki)}</div>
            <div className="mikata_area">{fighter_list(fighter)}</div>
            <Command
                fighter={fighter}
                setFighter={setFighter}
                teki={teki}
                setTeki={setTeki}
            />
        </div>
    );
}

export default App;
