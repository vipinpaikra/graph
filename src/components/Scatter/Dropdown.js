import React from "react";

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => {
    return (
        <select
            id={id}
            style={{ color: "white" }}
            onChange={(event) => onSelectedValueChange(event.target.value)}
        >
            {options.map(({ value, label }) => (
                <option
                    key={value}
                    value={value}
                    defaultValue={value === selectedValue}
                >
                    {label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
