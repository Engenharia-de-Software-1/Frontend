import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../../services/api';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { TextArea } from '../../../components/TextArea';
import { ButtonIdea } from '../../../components/ButtonIdea';
import { IIdea } from '../../../models/IIdea';

export default function ProfileAdmin() {    
    const [idea, setIdea] = useState<IIdea[]>([] as IIdea[]); 
    const [buttonAddIdea, setButtonAddIdea] = useState(false);

    const [nameIdea, setNameIdea] = useState<string>('');
    const [descriptionIdea, setDescriptionIdea] = useState<string>('');
    

    function useButtonAddIdea(){
        setButtonAddIdea(true);
    }
   
    function getIdeas() {
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
            nameIdea: 'Ideia 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            created_at: new Date(),
            isFavorite: false,
            pending: false,
        },
        {
            id: '3',
            nameIdea: 'Ideia 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            created_at: new Date(),
            isFavorite: false,
            pending: false,
        },
        {
            id: '4',
            nameIdea: 'Ideia 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            created_at: new Date(),
            isFavorite: false,
            pending: false,
        },
        {
            id: '5',
            nameIdea: 'Ideia 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            created_at: new Date(),
            isFavorite: false,
            pending: false,
        }

        ])
        })
    }

    useEffect(() => {
        getIdeas();
    }, []);
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar/>

            <div className={divGeneral}>
                <div className='flex justify-between'>
                    <h1 className={textTitle}>Minhas ideias</h1>

                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-40' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={useButtonAddIdea}
                    >
                        Adicionar ideia
                    </Button>
                </div>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {idea.map((idea) => (
                        <ButtonIdea idea={idea}/>
                    ))}         
                </div>
            </div> 
            <Modal 
                isOpen={buttonAddIdea} 
                onClose={() => setButtonAddIdea(false)} 
                title='Adicionar ideia'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={() => setButtonAddIdea(false)}
                    >
                        Salvar
                    </Button>
                }
            >
                <div className='flex flex-col'>
                    <Input 
                        haslabel 
                        label='Nome da ideia' 
                        placeholder='ex: Agro' 
                        bg='bg-grayBg'     
                        value={nameIdea}
                        onChange={(e) => setNameIdea(e.target.value)}   
                    />

                    <TextArea 
                        haslabel 
                        label='Descrição' 
                        placeholder='ex: Sistema de purificação de água'
                        value={descriptionIdea}
                        onChange={(e) => setDescriptionIdea(e.target.value)}
                        top='mt-2'                                        
                    />                   
                </div>
            </Modal>
        </Stack>
    );
}