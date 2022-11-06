import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../../services/api';
import { IProject } from '../../../models/IProject';
import { ButtonProject } from '../../../components/ButtonProject';

export default function ProfileAdmin() {    
    const [project, setProject] = useState<IProject[]>([] as IProject[]); 
    const [buttonAddProject, setButtonAddProject] = useState(false);

    function useButtonAddProject(){
        setButtonAddProject(true);
    }
   
    function getPendingProjects() {
        setTimeout(() => {
            setProject([
        {
            id: '1',
            nameProject: 'Projeto 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'ola mundo',
            created_at: new Date(),
            isFavorite: false,
        },
        {
            id: '2',
            nameProject: 'Projeto 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'ola mundo',
            created_at: new Date(),
            isFavorite: false,
        }

        ])
        })
    }

    useEffect(() => {
        getPendingProjects();
    }, []);
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar/>

            <div className={divGeneral}>    
                <h1 className={textTitle}>Projetos pendentes</h1>
               
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {project.map((project) => (
                        <ButtonProject project={project}/>
                    ))}         
                </div>
            </div> 
            
        </Stack>
    );
}