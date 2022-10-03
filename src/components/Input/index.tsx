import React, { InputHTMLAttributes } from 'react';
import { inputStyle, mainStyle } from './styles';

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
    return (        
    <div className={`${mainStyle}`}>
        { haslabel && (
            <label>{label}</label>
        )}
        <input className= {`
            ${inputStyle}   
            ${top}         
            appearance-none 
            border 
            rounded             
            text-gray-700 
            leading-tight 
            focus:outline-none 
            focus:shadow-outline
            `} 
            {...rest}
            />
    </div>
    
)}

export {Input};