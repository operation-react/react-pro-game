import { useState } from "react";
import classes from "../../lib/classes";

export default function Input(props) {
    const [ selfValue, setSelfValue ] = useState("");
    const [ focused, setFocused ] = useState(false);

    let value = props.value;
    let handler = props.onChange;

    if (!("value" in props)) {
        // handled by itself
        value = selfValue;
        handler = ({ target: { value }}) => setSelfValue(value);
    }

    const className = classes({
        "input": true,
        "input--focus": focused,
        "input--filled": value,
        [props.className]: props.className
    });

    return (
        <label className={ className }>
            <input type={ props.type || "text" }
                name={ props.name }
                value={ value }
                onChange={ handler }
                onFocus={ () => setFocused(true) }
                onBlur={ () => setFocused(false) }
                className="input__field" />
            <span className="input__placeholder">{ props.placeholder ?? props.name }</span>
            <span className="input__border"></span>
        </label>
    );
}
