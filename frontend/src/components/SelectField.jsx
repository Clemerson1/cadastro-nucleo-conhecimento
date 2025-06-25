import React from 'react';
import './SelectField.css'; // Estilos específicos

function SelectField({ id, value, onChange, options }) {
    return (
        <select id={id} value={value} onChange={onChange} className="select-field">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectField;