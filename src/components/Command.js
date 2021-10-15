import "./command.scss";
import React, { useEffect, useState } from "react";

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
            if (command[1] == "attack") {
                const newTeki = Object.assign([], teki);

                for (let i = 0; i<fighter.length; i++) {
                    if (command[0] == fighter[i].name) {
                        setTeki(
                            functions.changeHP_teki(newTeki, fighter[i].attack)
                        );
                    }
                }
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
