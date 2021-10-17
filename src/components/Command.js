import "./command.scss";
import React, { useEffect, useState } from "react";

function attack_fighter(functions, command, fighter, teki, setTeki) {
    const newTeki = Object.assign([], teki);
    for (let i = 0; i < fighter.length; i++) {
        if (command[0] == fighter[i].name) {
            setTeki(functions.changeHP_teki(newTeki, fighter[i].attack));
        }
    }
}

function heal_fighter(functions, command, fighter, setFighter) {
    const newFighter = Object.assign([], fighter);
    for (let i = 0; i < fighter.length; i++) {
        if (command[0] == fighter[i].name && command[2] != undefined) {
            // console.log(command[2]);
            setFighter(
                functions.change_Status_fighter(
                    newFighter,
                    command[2],
                    fighter[i].heal
                )
            );
        } else if (command[0] == fighter[i].name) {
            setFighter(
                functions.change_Status_fighter(
                    newFighter,
                    fighter[i].name,
                    fighter[i].heal
                )
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
