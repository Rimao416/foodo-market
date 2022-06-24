import React from 'react'

const Select = ({name,value,label,onChange,children}) => {
    return (
        <>
            <label htmlFor={name} className="label-input">
              {label}
            </label>
            <select name={name} id={name} onChange={onChange} required className="form-select form-control">
              {children}
            </select>
        </>
    )
}

export default Select