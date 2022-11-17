import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { IProject } from '../../../models/IProject';
import { useMyData } from '../../../services/queryClient/useMyData';
import { ButtonProject } from '../../../components/ButtonProject';

export default function ProfileAdmin() {    
    const { data, refetch } = useMyData();
   
    const [project, setProject] = useState<IProject[]>([] as IProject);
    const [buttonCheck, setButtonCheck] = useState(false);
    


    function useButtonCheck() {
        setButtonCheck(!buttonCheck);
    }

   
    function getProject() {
        setTimeout(() => {
            setProject([
        {
            id: '1',
            title: 'Projeto 1',
            solution: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'jsgdshdjshdjshd',
            situation: 'false',
            userId: '1',
        },
        {
            id: '2',
            title: 'Projeto 2',
            solution: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'jsgdshdjshdjshd',
            situation: 'false',
            userId: '1',
        },
        {
            id: '3',
            title: 'Projeto 3',
            solution: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'jsgdshdjshdjshd',
            situation: 'false',
            userId: '1',
        },
        {
            id: '4',
            title: 'Projeto 4',
            solution: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'jsgdshdjshdjshd',
            situation: 'false',
            userId: '1',
        },
        {
            id: '5',
            title: 'Projeto 5',
            solution: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'jsgdshdjshdjshd',
            situation: 'false',
            userId: '1',
        }

        ])
        })
    }

    useEffect(() => {
        getProject();
    }, []);
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar  data={data}/>

            <div className={divGeneral}>
                <div className='flex justify-between items-center'>
                    <h1 className={textTitle}>Lista Projetos</h1>

                    <label className="flex items-center ">
                        <input onClick={useButtonCheck} type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" defaultChecked={buttonCheck} />
                        <span className="ml-2 text-gray-600">filtrar por visualizados por último</span>
                    </label>        
                </div>

                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {project.map((project) => (
                        <ButtonProject project={project} userType={''}/>
                    ))}                        
                </div>
            </div> 
        </Stack>
    );
}