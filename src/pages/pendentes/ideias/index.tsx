import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { useMyData } from '../../../services/queryClient/useMyData';
import { IIdea } from '../../../models/IIdea';
import { ButtonIdea } from '../../../components/ButtonIdea';

export default function ProfileAdmin() {    
    const myData = useMyData();
    
    const [idea, setIdea] = useState<IIdea[]>([] as IIdea[]);; 
    const [buttonCheck, setButtonCheck] = useState(false);
    
    function useButtonCheck() {
        setButtonCheck(!buttonCheck);
    }
   
    function getPendingIdeas() {
        setTimeout(() => {
            setIdea([
        {
            id: '1',
            nameIdea: 'Ideia 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            created_at: new Date(),
            isFavorite: false,
            pending: false,
        },
        {
            id: '2',
            nameIdea: 'Ideia 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            created_at: new Date(),
            isFavorite: false,
            pending: false,
        },

        ])
        })
    }

    useEffect(() => {
        getPendingIdeas();
    }, []);
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar  data={myData.data}/>

            <div className={divGeneral}>    
                <div className='flex justify-between items-center'>
                    <h1 className={textTitle}>Ideias pendentes</h1>

                    <label className="flex items-center ">
                        <input onClick={useButtonCheck} type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" defaultChecked={buttonCheck} />
                        <span className="ml-2 text-gray-600">visualizar do mais antigo para o mais recente</span>
                    </label>

                </div>
               
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {idea.map((idea) => (
                        <ButtonIdea idea={idea} />
                    ))}         
                </div>
            </div> 
            
        </Stack>
    );
}