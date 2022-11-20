import React, { useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { TextArea } from '../../../components/TextArea';
import { ButtonIdea } from '../../../components/ButtonIdea';
import { useMyData } from '../../../services/queryClient/useMyData';
import api from '../../../services/api';
import { useMyIdeas } from '../../../services/queryClient/useMyIdeas';
import { useFavIdeas } from '../../../services/queryClient/useFavIdeas';

type IdeasType = {
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    openAddModal: boolean;
}

export default function ProfileAdmin() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useMyIdeas(myData.data?.user.id as string);
    const favs = useFavIdeas();
    const [ideasStates, setIdeasStates] = useState<IdeasType>({ } as IdeasType);

    function handleButtonAddIdea(){
        setIdeasStates({...ideasStates, openAddModal: !ideasStates.openAddModal});
    }
    
    useEffect(() => {
        refetch()
        favs.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myData.data, data])

    let r = data?.filter((el1) => {
        if(favs.data?.indexOf(el1) === -1) {
            return el1;
        }
    })
    console.log(r)

    async function handleAddIdea() {
        if(ideasStates.title && ideasStates.description){
            const response = await api.post(`/idea`, {
                ...ideasStates,
                userId: myData.data?.user.id,
                situation: 'pending'
            });
            if(response.status.toString().startsWith('2')){
                setIdeasStates({} as IdeasType);
                refetch();
                alert('Ideia adicionada com sucesso! Agora ele está aguardando a aprovação de um administrador.');
            } else {
                alert('Erro ao cadastrar ideia. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
        handleButtonAddIdea();
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

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
                        onClick={handleButtonAddIdea}
                    >
                        Adicionar ideia
                    </Button>
                </div>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando ideias...</h1>)}
                    {!isLoading && !isFetching && data?.length === 0 && (<h1>Não há nenhuma ideia aqui</h1>)}
                    {!isLoading && !isFetching && data && data?.filter((el) => favs.data?.indexOf(el) === -1).map((idea) => (
                        <ButtonIdea 
                            key={idea.id} 
                            idea={idea} 
                            userType={myData.data?.type as string} 
                            favorite={favs.data} 
                            final={() => {
                                favs.refetch();
                                refetch();
                            }}
                        />
                    ))} 
                </div>
            </div> 
            <Modal 
                isOpen={ideasStates.openAddModal} 
                onClose={handleButtonAddIdea} 
                title='Adicionar ideia'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={handleAddIdea}
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
                        value={ideasStates.title}
                        onChange={(e) => setIdeasStates({ ...ideasStates, title: e.target.value })}   
                    />

                    <TextArea 
                        haslabel 
                        label='Descrição' 
                        placeholder='ex: Sistema de purificação de água'
                        value={ideasStates.description}
                        onChange={(e) => setIdeasStates({ ...ideasStates, description: e.target.value })}   
                        top='mt-2'                                        
                    />                   
                </div>
            </Modal>
        </Stack>
    );
}