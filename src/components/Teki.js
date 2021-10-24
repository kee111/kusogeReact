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
    let choiceFighter = 0;

    // 生きてるファイターが選ばれるまでループする関数
    const shuffle_choice = () => {
        choiceFighter = Math.floor(Math.random() * 3);
        while (true) {
            if (fighter[choiceFighter].life == false) {
                shuffle_choice();
            } else return;
        }
    };

    shuffle_choice();

    setFighter(
        change_Status_fighter(
            newFighter,
            fighter[choiceFighter].name,
            teki.attack,
            0
        )
    );
};
