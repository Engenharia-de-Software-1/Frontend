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
        <button className='bg-transparent text-black'>
            
            <div className='rel flex justify-between mt-8 w-full '>
                <h1 className="text-start text-2xl font-semibold">
                    {project.title}
                </h1>

                <div className='abs'>
                    <button onClick={useButtonStar} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                </div>
            </div>
              
            <h1 className="text-justify pt-5">
                {project.solution}    
            </h1>     

            <h2 className='text-black62 text-sm text-right pb-5'> 
                Criado em {format(new Date(), "dd/MM/yyyy")}
            </h2>
        </button>       
    );
}

export {ButtonProject}