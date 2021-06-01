import classes from "../../lib/classes";

export default function Button(props) {
    const className = classes({
        "button": true,
        [props.className]: props.className
    });

    return (
        <button className={ className }>
            { props.children || props.text }
        </button>
    );
}