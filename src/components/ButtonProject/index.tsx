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
        <>
        <button className='bg-transparent text-black'>
            
            <div className='rel flex justify-between mt-8 w-full '>
                <h1 className="text-start text-2xl font-semibold">
                    {project.nameProject}
                </h1>

                {userType !== 'admin' && (
                    <div className='abs'>
                        <button onClick={useButtonStar} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                    </div>                  
                
            )}   
            </div>
            {userType !== 'admin' && (
                <h1 className="text-justify pt-5">
                    {project.description}    
                </h1>              
                
            )} 
           
            {userType === 'admin' && (
                <>
                    <h1 className="text-justify pt-5">
                        <b>Solução: </b> {project.description}    
                    </h1>              
                    <h1 className="text-justify pt-5">
                        <b>Problema: </b> {project.problem}    
                    </h1>   
                </>
                
            )}  


            <h2 className='text-black62 text-sm text-right pb-5'> 
                Criado em {format(project.created_at, "dd/mm/yyyy")}
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
        
        </>    
    );
}

export {ButtonProject}