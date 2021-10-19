import "./command.scss";
import React, { useEffect, useState } from "react";

// ゴリラを攻撃する関数
function attack_fighter(functions, command, fighter, teki, setTeki) {
    const newTeki = Object.assign([], teki);
    for (let i = 0; i < fighter.length; i++) {
        if (command[0] == fighter[i].name) {
            setTeki(functions.changeHP_teki(newTeki, fighter[i].attack));
        }
    }
}

// ファイターを回復する関数
function heal_fighter(functions, command, fighter, setFighter) {
    const newFighter = Object.assign([], fighter);
    for (let i = 0; i < fighter.length; i++) {
        // もし、第二引数(指定のファイター)がなければ
        if (command[0] == fighter[i].name && command[2] == undefined) {
            console.log(command[2]);
            setFighter(
                functions.change_Status_fighter(
                    newFighter,
                    command[0],
                    fighter[i].heal,
                    -20
                )
            );
            // もし、第二引数(指定のファイター)があれば
        } else if (command[0] == fighter[i].name && command[2] != undefined) {
            // 回復されるファイター
            setFighter(
                functions.change_Status_fighter(
                    newFighter,
                    command[2],
                    fighter[i].heal,
                    0
                )
            );
            // 回復をしてあげるファイター
            setFighter(
                functions.change_Status_fighter(newFighter, command[0], 0, -20)
            );
        }
    }
}

export default function Command_area({
    functions,
    fighter,
    setFighter,
    teki,
    setTeki,
}) {
    const [textArea, setTextArea] = useState("");

    function handleChange(e) {
        setTextArea(e.target.value);
    }

    const handleKeyDown = (event) => {
        // enterを判定
        if (event.key === "Enter") {
            const command = textArea.split(" ");

            // もしアタックコマンドが呼び出されたら
            if (command[1] == "attack") {
                attack_fighter(functions, command, fighter, teki, setTeki);
            }
            // もし、ヒールが呼び出されたら
            if (command[1] == "heal") {
                heal_fighter(functions, command, fighter, setFighter);
            }
            setTextArea("");
        }
    };

    return (
        <div className="command_wrapper">
            <div className="command_area">
                command_area
                <input
                    type="text"
                    value={textArea}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                ></input>
            </div>
        </div>
    );
}
