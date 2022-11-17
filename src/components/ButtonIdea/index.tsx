import 'remixicon/fonts/remixicon.css';
import React, { useState } from "react";
import { format } from 'date-fns';
import { IIdea } from '../../models/IIdea';
import { Button } from '../Button';

interface IIdeaProps {
    idea: IIdea;
}

function ButtonIdea({ idea }: IIdeaProps) {   
   const [starButton, setStarButton] = useState(false);

   const [userType, setUserType] = useState('admin');


    function useButtonStar() {
        setStarButton(!starButton);
    }

    return (          
        <button className='bg-transparent text-black'>
            
            <div className='rel flex justify-between mt-8 w-full '>
                <div className='flex gap-5'>
                    <h1 className="text-start text-2xl font-semibold">
                        {idea.nameIdea}
                    </h1>
                    {userType === 'cliente' && (
                        <Button
                            bg='bg-warning' 
                            rounded='rounded-full' 
                            w='w-28' 
                            h='h-8' 
                            textColor='text-white' 
                            textWeight='font-bold'
                        >
                            Pendente
                        </Button>
                    
                )}

                </div>

                <div className='abs'>
                    <button onClick={useButtonStar} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                </div>
            </div>
              
            <h1 className="text-justify pt-5">
                {idea.description}    
            </h1>     

            <h2 className='text-black62 text-sm text-right pb-5'> 
                Criado em {format(idea.created_at, "dd/mm/yyyy")}
            </h2>

            {userType === 'admin' && (
                <div className='pb-5 text-right space-x-5'>
                    <Button
                        bg='bg-greenDark' 
                        rounded='rounded-lg' 
                        w='w-36' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                       
                    >
                        APROVAR
                    </Button>

                    <Button
                        bg='bg-warning' 
                        rounded='rounded-lg' 
                        w='w-36' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                       
                    >
                        RECUSAR
                    </Button>
                </div>    
            )}  
        </button>       
    );
}

export {ButtonIdea}