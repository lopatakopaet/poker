import React from 'react';
import './index.css'

export const Button = (props) => {
    let {name, color, onClick} = props;
    let className = 'button';

    if (color) {
        className = `${className} c-${color}`;
    }

    return (
        <div className={className} onClick={onClick}>
            <span>{name}</span>
        </div>
    );
};

export default Button;

