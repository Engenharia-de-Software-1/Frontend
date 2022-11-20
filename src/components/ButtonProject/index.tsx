import React, { useState } from "react";
import { format } from 'date-fns';
import { IProject } from "../../models/IProject";
import { Button } from '../Button';
import { useRouter } from 'next/router';

interface IProjectProps {
    project: IProject;
    userType: string;
    recuseProject?: () => void;
    acceptProject?: () => void;
}

function ButtonProject({ project, userType, recuseProject, acceptProject }: IProjectProps) {  
    const router = useRouter();  
    const [starButton, setStarButton] = useState(false);

    function useButtonStar() {
        setStarButton(!starButton);
    }

    return (          
        <button className='relative bg-transparent text-black transition-all hover:bg-gray-50 duration-300' onClick={() => router.push(`/projeto/${project.id}`)}>
            <div className='relative flex justify-between mt-8 w-full '>
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
                    { project.situation === 'recused' && (
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
              
            <h1 className="text-justify pt-5">
                {project.solution.length > 500 ? project.solution.substring(0, 500) + '...' : project.solution}   
            </h1>     

            <h2 className={`text-black62 text-sm text-right ${userType === 'admin' ? 'pb-24' : 'pb-5'}`}> 
                Criado em {format(new Date(), "dd/MM/yyyy")}
            </h2>

            {userType === 'admin' && (
                <div className='absolute right-0 text-right space-x-5 bottom-8'>
                    <Button
                        bg='bg-greenDark' 
                        rounded='rounded-lg' 
                        w='w-36' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={() => acceptProject && acceptProject()}
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
                        onClick={() => recuseProject && recuseProject()}
                    >
                        RECUSAR
                    </Button>
                </div>                       
                
            )}  
        </button>         
    );
}

export {ButtonProject}