import React, { ButtonHTMLAttributes } from "react";
import { buttonStyleSidebar } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    bg?: string; 
    textColor?: string;
    textWeight?: string;
}
function Button({
    bg='bg-transparent',
    textColor='text-greenText',
    textWeight='font-semibold',    
    
    ...rest 
}: IButtonProps) {
    return (           
        <button className={`${buttonStyleSidebar} ${bg} ${textColor} ${textWeight}
        flex 
        justify-start
        text-base 
        rounded-normal
        px-7
        w-full
        h-8
        `}
        {...rest}
        />        
    );
}

export {Button}