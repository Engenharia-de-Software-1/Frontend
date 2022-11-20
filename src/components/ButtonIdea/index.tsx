import 'remixicon/fonts/remixicon.css';
import React, { useState } from "react";
import { format } from 'date-fns';
import { IIdea } from '../../models/IIdea';
import { Button } from '../Button';
import api from '../../services/api';

interface IIdeaProps {
    idea: IIdea;
    userType: string; 
    favorite?: IIdea[];
    final: () => void;
    recuseIdea?: () => void;
    acceptIdea?: () => void;
}

function ButtonIdea({ idea, userType, favorite, final, recuseIdea, acceptIdea }: IIdeaProps) {  
   let starButton = favorite?.filter(el => el.id === idea.id).length === 0 ? false : true;

    async function handleButtonStar(id: string) {
        await api.post('idea/favorite', { ideaId: id })
        final();
    }

    return (          
        <button className='relative bg-transparent text-black'>
            
            <div className='flex justify-between mt-8 w-full '>
                <div className='flex gap-5'>
                    <h1 className="text-start text-2xl font-semibold">
                        {idea.title}
                    </h1>
                    {userType === 'cliente' && idea.situation === 'pending' && (
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
                    {userType === 'cliente' && idea.situation === 'recused' && (
                        <Button
                            bg='bg-warning' 
                            rounded='rounded-full' 
                            w='w-28' 
                            h='h-8' 
                            textColor='text-white' 
                            textWeight='font-bold'
                        >
                            Recusado
                        </Button> 
                    ) } 
                </div>
            </div>
            { userType !== 'admin' && (
                <div className='absolute right-0 top-10'>
                    <button onClick={() => handleButtonStar(idea.id)} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                </div>
            ) }
              
            <h1 className="text-justify pt-5">
                {idea.description}    
            </h1>     

            <h2 className='text-black62 text-sm text-right pb-5'> 
                Criado em {idea.updatedAt ? format(new Date(idea.updatedAt), "dd/MM/yyyy") : format(new Date(), "dd/MM/yyyy")}
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
                        onClick={() => acceptIdea && acceptIdea()}
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
                        onClick={() => recuseIdea && recuseIdea()}
                    >
                        RECUSAR
                    </Button>
                </div>                       
                
            )}  
        </button>       
    );
}

export {ButtonIdea}