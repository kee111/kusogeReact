export default function Fighter({ name, hp ,mp}) {
    return (
        <div className={name + "_wrapper"}>
            <div className="status">
                <div className={"name"}>{name}</div>
                <div className="hp">{"HP:"+hp}</div>
                <div className="mp">{"MP:"+mp}</div>
            </div>
        </div>
    );
}
