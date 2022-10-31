import 'remixicon/fonts/remixicon.css';
import React, { useState } from "react";
import { format } from 'date-fns';
import { IProject } from "../../models/IProject";

interface IProjectProps {
    project: IProject;
}

function ButtonProject({ project }: IProjectProps) {   
   const [starButton, setStarButton] = useState(false);

    function useButtonStar() {
        setStarButton(!starButton);
}
    return (          
        <button className='relative bg-transparent text-black'>
            
            <div className='flex justify-between w-full '>
                <h1 className="text-start text-2xl font-semibold pt-8">
                    {project.nameProject}
                </h1>

                <div className='absolute bottom-[170px] top-0 left-full'>
                    <button onClick={useButtonStar}  className='ri-star-line ri-2x'/>
                    {/* console.log(starButton) */}
                    <button onClick={useButtonStar} className='ri-star-fill ri-2x'/>
                </div>
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