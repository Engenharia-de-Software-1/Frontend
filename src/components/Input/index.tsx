import React, { InputHTMLAttributes } from 'react';
import { inputStyle, mainStyle, legendStyle } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    haslabel?: boolean;
    label?: string;    
    fontSize?: string;
    top?: string;
    bg?: string;
}

function Input({
    haslabel = false, 
    label, 
    top = "mt-0",
    bg = "bg-Input2",
    ...rest
}: IInputProps) {
    if(haslabel) {
        return (
            <fieldset className={`${mainStyle} ${top} ${bg}`}>
                <legend className={legendStyle}>{label}</legend>
                <input className={`${inputStyle} ${bg}`} {...rest}/>
            </fieldset> 
        )
    } 

    return (
        <input {...rest} />
    )
}

export {Input};