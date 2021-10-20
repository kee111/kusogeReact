import "./command.scss";
import React, { useEffect, useState } from "react";

// ファイター用関数
const fighter_functions = {
    // ゴリラを攻撃する関数
    attack_fighter: (
        functions,
        command,
        fighter,
        setFighter,
        teki,
        setTeki
    ) => {
        const newTeki = Object.assign([], teki);
        const newFighter = Object.assign([], fighter);
        for (let i = 0; i < fighter.length; i++) {
            if (command[0] == fighter[i].name) {
                setTeki(
                    functions.change_Status_teki(newTeki, fighter[i].attack)
                );
                // 行動したファイターのターンを終了
                setFighter(
                    functions.change_turn_fighter(newFighter, command[0], false)
                );
            }
        }
    },

    // ファイターを回復する関数
    heal_fighter: (functions, command, fighter, setFighter) => {
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
            } else if (
                command[0] == fighter[i].name &&
                command[2] != undefined
            ) {
                // 回復されるファイター
                setFighter(
                    functions.change_Status_fighter(
                        newFighter,
                        command[2],
                        fighter[i].heal,
                        0
                    ),
                    // 回復をしてあげるファイター
                    functions.change_Status_fighter(
                        newFighter,
                        command[0],
                        0,
                        -20
                    ),
                    // 行動したファイターのターンを終了
                    functions.change_turn_fighter(newFighter, command[0], false)
                );
            }
        }
    },
};

// ゴリラ用関数
const Teki_functions = {
    // 攻撃
    attack_teki: (functions, fighter, setFighter, teki) => {
        const newFighter = Object.assign([], fighter);
        const choiceFighter = Math.floor(Math.random() * 3);
        console.log(fighter);

        setFighter(
            functions.change_Status_fighter(
                newFighter,
                fighter[choiceFighter].name,
                teki.attack,
                0
            )
        );
    },
};

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

            fighter.forEach((fighter) => {
                console.log(fighter);
            });

            // 行動させるファイターのターンを確認ここがむずい
            if (functions.judge_turn_fighter(command[0], fighter)) {
                if (command[1] == "attack") {
                    // もしアタックコマンドが呼び出されたら
                    fighter_functions.attack_fighter(
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
                    fighter_functions.heal_fighter(
                        functions,
                        command,
                        fighter,
                        setFighter
                    );
                }
                setTextArea("");

                // もし全員のターンが終了したら、全員のターンをリセットさせ、ゴリラに行動させる。
                if (!fighter[0].turn & !fighter[1].turn & !fighter[2].turn) {
                    // ターンリセット
                    fighter.forEach((fighter) => {
                        fighter.turn = true;
                    });
                    // 敵の攻撃
                    alert("敵の攻撃");
                    Teki_functions.attack_teki(
                        functions,
                        fighter,
                        setFighter,
                        teki
                    );
                }
            } else {
                alert(command[0] + "のターンは終了した");
                setTextArea("");
            }
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
