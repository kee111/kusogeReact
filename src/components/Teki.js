import { change_Status_fighter } from "../functions/figher_func";

export default function Teki({ name, hp }) {
    return (
        <div className={name + "_wrapper"}>
            <div className="status">
                <div className={"name"}>{name}</div>
                <div className="hp">{"HP:" + hp}</div>
            </div>
        </div>
    );
}

// 攻撃
export const attack_teki = (functions, fighter, setFighter, teki) => {
    const newFighter = Object.assign([], fighter);
    const choiceFighter = Math.floor(Math.random() * 3);

    setFighter(
        change_Status_fighter(
            newFighter,
            fighter[choiceFighter].name,
            teki.attack,
            0
        )
    );
}