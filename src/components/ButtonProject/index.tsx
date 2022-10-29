import 'remixicon/fonts/remixicon.css';
import React from "react";
import { format } from 'date-fns';
import { IProject } from "../../models/IProject";

interface IProjectProps {
    project: IProject;
}


function ButtonProject({ project }: IProjectProps) {   
   
    return (          
        <button className='bg-transparent text-black'>
            
            <div className='flex justify-between w-full '>
                <h1 className="text-start text-2xl font-semibold pt-8">
                    {project.nameProject}
                </h1>

                <button icon="ri-start-line" className='w-12 h-12 bg-black'/>
            </div>
              
            <h1 className="text-start text-justify pt-5">
                {project.description}    
            </h1>     
            <h2 className='text-black62 text-sm text-right pb-5'> 
                Criado em {format(project.created_at, "dd/mm/yyyy")}
            </h2>
        </button>       
    );
}

export {ButtonProject}