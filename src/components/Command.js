import "./command.scss";
import React, { useEffect, useState } from "react";

// ゴリラを攻撃する関数
function attack_fighter(
    functions,
    command,
    fighter,
    setFighter,
    teki,
    setTeki
) {
    const newTeki = Object.assign([], teki);
    const newFighter = Object.assign([], fighter);
    for (let i = 0; i < fighter.length; i++) {
        if (command[0] == fighter[i].name) {
            setTeki(functions.change_Status_teki(newTeki, fighter[i].attack));
            // 行動したファイターのターンを終了
            setFighter(
                functions.change_turn_fighter(newFighter, command[0], false)
            );
        }
    }
}

// ファイターを回復する関数
function heal_fighter(functions, command, fighter, setFighter) {
    const newFighter = Object.assign([], fighter);
    for (let i = 0; i < fighter.length; i++) {
        // もし、第二引数(指定のファイター)がなければ
        if (command[0] == fighter[i].name && command[2] == undefined) {
            // 自分自身を回復
            setFighter(
                functions.change_Status_fighter(
                    newFighter,
                    command[0],
                    fighter[i].heal,
                    -20
                ),
                // 行動したファイターのターンを終了
                functions.change_turn_fighter(newFighter, command[0], false)
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
                ),
                // 回復をしてあげるファイター
                functions.change_Status_fighter(newFighter, command[0], 0, -20),
                // 行動したファイターのターンを終了
                functions.change_turn_fighter(newFighter, command[0], false)
            );
        }
    }
}

// main
export default function Command_area({
    functions,
    fighter,
    setFighter,
    teki,
    setTeki,
}) {
    const [textArea, setTextArea] = useState("");

  
    // text入力を監視
    function handleChange(e) {
        setTextArea(e.target.value);
    }

    // コマンド打ち込んだ時の処理
    const handleKeyDown = (event) => {
        // enterを判定
        if (event.key === "Enter") {
            const command = textArea.split(" ");

            // 行動させるファイターのターンを確認

            console.log(functions.judge_turn_fighter(command[0], fighter));

            if (command[1] == "attack") {
                // もしアタックコマンドが呼び出されたら
                attack_fighter(
                    functions,
                    command,
                    fighter,
                    setFighter,
                    teki,
                    setTeki
                );
            }
            // もし、ヒールが呼び出されたら
            if (command[1] == "heal") {
                heal_fighter(functions, command, fighter, setFighter);
            }
            setTextArea("");
        }
    };

    // JSX
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
