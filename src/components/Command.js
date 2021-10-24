import "./command.scss";
import React, { useEffect, useState } from "react";
import {
    attack_fighter,
    check_fighter,
    heal_fighter,
    judge_turn_fighter,
    limit_fighter,
} from "../functions/figher_func";
import { attack_teki } from "./Teki";

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
        // 死んだファイターの行動を制限
        limit_fighter(fighter,e.target.value,setTextArea);
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
            if (judge_turn_fighter(command[0], fighter)) {
                alert(command[0] + "の" + command[1] + "発動");
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

                // もし全員のターンが終了したら、全員のターンをリセットさせ、ゴリラに行動させる。
                if (!fighter[0].turn & !fighter[1].turn & !fighter[2].turn) {
                    // ターンリセット
                    fighter.forEach((fighter) => {
                        fighter.turn = true;
                    });
                    setTimeout(function () {
                        // 敵の攻撃
                        alert("敵の攻撃");
                        attack_teki(functions, fighter, setFighter, teki);
                        setFighter(check_fighter(fighter));
                    }, 1500);
                }
            } else {
                alert(command[0] + "のターンは終了した");
                setTextArea("");
            }
            // 敵が死んだら
            if (teki.hp <= 0) {
                alert(teki.name + "が死にました");
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
