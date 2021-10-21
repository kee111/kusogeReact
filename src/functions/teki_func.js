// 敵のHPを変更。
export const change_Status_teki = (newTeki, hp) => {
    newTeki.hp = newTeki.hp + hp;
    return newTeki;
}