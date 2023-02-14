import React from "react";

function Button(props) {
    const {onClick, title, backgroundColor, color} = props;
    const style = {
        cursor: "pointer",
        minWidth: '49%',
        border: "none", borderRadius: ".375em",
        fontSize: '1.125em', fontWeight: '700',
        padding: '.875em 2.5em'
    }
    style.backgroundColor = backgroundColor;
    style.color = color == undefined ? '#fff' : color;

    return (
        <>
            <button
                style={style}
                type={onClick ? "button" : "submit"}
                onClick={onClick}
            >{title}</button>
        </>
    )
}

export default Button;