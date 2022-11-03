import React, { InputHTMLAttributes } from 'react';
import { legendStyle } from '../Input/styles';
import { mainStyle, textAreaStyles } from './styles';

interface ITextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement>{
    haslabel?: boolean;
    label?: string;
    top?: string;
    bg?: string;   
}

function TextArea({
    haslabel = false, 
    label, 
    top = "mt-0",
    bg = "bg-grayBg",   
    ...rest
}: ITextAreaProps) {
    if(haslabel) {
        return (      
            <fieldset className={`${mainStyle} ${top} ${bg}`}>
                <legend className={legendStyle}>{label}</legend>
                <textarea className={`${textAreaStyles} ${bg}`} {...rest}/>
            </fieldset> 
        )
    }
    return (
        <textarea {...rest} />
    )
}
export {TextArea};