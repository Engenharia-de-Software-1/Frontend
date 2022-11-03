import React, { SelectHTMLAttributes } from 'react';
import { selectStyle, legendStyle, mainStyle } from './styles';

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    haslabel?: boolean;
    label?: string;
    top?: string;
    w?: string;   
    h?: string;    
    fontSize?: string;
    bg?: string;
}

function Select({
    haslabel = false, 
    label, 
    top = "mt-0",
    w = "w-full",
    h, 
    bg = "bg-Input2",
    fontSize,
    ...rest
}: ISelectProps) {
    return (     
        <fieldset className={`${mainStyle} ${top} ${bg}`}>
            <legend className={legendStyle}>{label}</legend>
            <select className={`${selectStyle} ${bg}`} {...rest}/>
        </fieldset>        
)}

export {Select};