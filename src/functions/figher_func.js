// ファイターのステータスを変更。第二引数に入ったファイターが変更
export const change_Status_fighter = (newFigher, fighterName, hp, mp) => {
    return newFigher.map((fighter) => {
        if (fighterName == fighter.name) {
            fighter.hp = fighter.hp + hp;
            fighter.mp = fighter.mp + mp;
        }
        return fighter;
    });
}
// ファイターのターンを変更(主に終了)させる関数
export const change_turn_fighter = (newFigher, fighterName, turn) => {
    return newFigher.map((fighter) => {
        if (fighterName == fighter.name) {
            fighter.turn = turn;
        }
        return fighter;
    });
}

// ターンを判定する関数
export const judge_turn_fighter = (fighterName, fighter) => {
    for (let i = 0; i < fighter.length; i++) {
        if (fighterName == fighter[i].name) {
            return fighter[i].turn;
        }
    }
}

// ゴリラを攻撃する関数
export const attack_fighter = (
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
}

// ファイターを回復する関数
export const heal_fighter = (functions, command, fighter, setFighter) => {
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
}