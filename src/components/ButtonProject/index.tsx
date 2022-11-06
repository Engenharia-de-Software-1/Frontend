import 'remixicon/fonts/remixicon.css';
import React, { useState } from "react";
import { format } from 'date-fns';
import { IProject } from "../../models/IProject";
import { Button } from '../Button';

interface IProjectProps {
    project: IProject;
}

function ButtonProject({ project }: IProjectProps) {   
   const [starButton, setStarButton] = useState(false);

   const [userType, setUserType] = useState('admin');

    function useButtonStar() {
        setStarButton(!starButton);
    }

    return (          
        <button className='bg-transparent text-black transition-all hover:bg-gray-50 duration-300'>
            <div className='rel flex justify-between mt-8 w-full '>
                <div className='flex'>
                    <h1 className="text-start text-2xl font-semibold mr-5">
                        {project.title}
                    </h1>

                    { project.situation === 'pending' && (
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
                    ) }  
                </div>

                {userType !== 'admin' && (
                    <div className='abs'>
                        <button onClick={useButtonStar} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                    </div>                  
                
            )}   
            </div>
              
            <h1 className="text-justify pt-5">
                {project.solution.length > 500 ? project.solution.substring(0, 500) + '...' : project.solution}   
            </h1>     

            <h2 className='text-black62 text-sm text-right pb-5'> 
                Criado em {format(new Date(), "dd/MM/yyyy")}
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

export {ButtonProject}