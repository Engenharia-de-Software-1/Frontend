import React, { InputHTMLAttributes } from 'react';
import { inputStyle, mainStyle, legendStyle } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    haslabel?: boolean;
    label?: string;    
    fontSize?: string;
    top?: string;
}

function Input({
    haslabel = false, 
    label, 
    top = "mt-0",
    ...rest
}: IInputProps) {
    if(haslabel) {
        return (
            <fieldset className={`${mainStyle} ${top}`}>
                <legend className={legendStyle}>{label}</legend>
                <input className={inputStyle} {...rest}/>
            </fieldset> 
        )
    } 

    return (
        <input {...rest} />
    )
}

export {Input};