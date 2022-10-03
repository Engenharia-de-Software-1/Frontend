import React, { ButtonHTMLAttributes } from "react";
import { buttonStyle } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    bg?: string;
    rounded?: string;
    w?: string;
    h?:string;
    textColor?: string;
    textWeight?: string;
}
function Button({
    bg='bg-transparent',
    rounded='rounded', 
    textColor='text-black',
    textWeight='font-normal',
    w, 
    h, 
    ...rest 
}: IButtonProps) {
    return (           
        <button className={`${buttonStyle} ${bg} ${rounded} ${textColor} ${w} ${h} ${textWeight}`}
            {...rest}
        />        
    );
}

export {Button}