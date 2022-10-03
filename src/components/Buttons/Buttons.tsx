import React, { ButtonHTMLAttributes } from "react";
import { textStyle } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    bg?: string;
    rounded?: string;
    w?: string;
    h?:string;
    textColor?: string;
}
function Buttons({bg='bg-white', rounded='rounded', textColor='text-black',w, h, ...rest }: IButtonProps) {
    return (
    
        <div>
            <button className={`${textStyle} ${bg} ${rounded} ${textColor} ${w} ${h}   
            inline-flex 
            items-center
            hover:bg-greenLight
            `}
            {...rest}
             />
   
        </div>
      
    );
}

export {Buttons}