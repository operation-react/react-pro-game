import classes from "../../lib/classes";

export default function Card(props) {
    const className = classes({
        "card": true,
        [props.className]: props.className
    });

    return (
        <div className={ className }>
            { props.children }
        </div>
    );
}
