import React, { SelectHTMLAttributes } from 'react';
import { selectStyle, legendStyle, mainStyle } from './styles';

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    haslabel?: boolean;
    label?: string;
    top?: string;
    w?: string;   
    h?: string;    
    fontSize?: string;
}

function Select({
    haslabel = false, 
    label, 
    top = "mt-0",
    w = "w-full",
    h, 
    fontSize,
    ...rest
}: ISelectProps) {
    return (     
        <fieldset className={`${mainStyle} ${top}`}>
            <legend className={legendStyle}>{label}</legend>
            <select className={selectStyle} {...rest}/>
        </fieldset>        
)}

export {Select};