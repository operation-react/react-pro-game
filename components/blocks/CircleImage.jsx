import classes from "../../lib/classes";

export default function CircleImage(props) {
    const className = classes({
        "circle-image": true,
        "circle-image--sec": props.secondaryColor,
        [props.className]: props.className
    });

    return (
        <figure className={ className }>
            <img width={ props.width }
                height={ props.height }
                src={ props.src }
                alt={ props.alt || props.src } />
        </figure>
    );
}
