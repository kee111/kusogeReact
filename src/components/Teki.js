export default function Teki({ name, hp }) {
    return (
        <div className={name + "_wrapper"}>
            <div className="status">
                <div className={"name"}>{name}</div>
                <div className="hp">{"HP:"+hp}</div>
            </div>
        </div>
    );
}
