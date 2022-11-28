import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textStyle, textTitle } from './styles';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { TextArea } from '../../../components/TextArea';
import { useMyData } from '../../../services/queryClient/useMyData';
import api from '../../../services/api';
import { useOneIdea } from '../../../services/queryClient/useOneIdea';

type IdeaType = {
    title: string;
    description: string;
    openEditModal: boolean;
}

export default function ProfileAdmin() {    
    const router = useRouter();
    const [ideaStates, setIdeaStates] = useState<IdeaType>({ } as IdeaType);

    const myData = useMyData();
    const { data, isFetched, refetch } = useOneIdea(router.query.id as string);
    

    function handleButtonEditIdea(){
        setIdeaStates({...ideaStates, openEditModal: !ideaStates.openEditModal});
    }

    function goBack(){
        router.back();
    }

    async function handleActionIdea(ideaOwner: string, id: string, situation: string) {
        if(myData.data?.type === 'admin'){
            const response = await api.put(`/idea/situation/${id}`, { situation });
            if(!response.status.toString().startsWith('2')){
                alert('Erro ao recusar ideia. Tente novamente mais tarde.');
            } else {
                router.push('/pendentes/ideias')
            }
        } else {
            alert('Você não tem permissão para realizar essa ação.');
        }
        refetch();
    }

    async function handleEditIdea() {
        if(ideaStates.title && ideaStates.description){
            const response = await api.put(`/idea/${router.query.id}`, {
                ...ideaStates,
                userId: myData.data?.user.id,
                situation: 'pending'
            });
            if(response.status.toString().startsWith('2')){
                setIdeaStates({} as IdeaType);
                refetch();
                alert('Ideia editada com sucesso! Agora ela está aguardando a aprovação de um administrador.');
            } else {
                alert('Erro ao cadastrar ideia. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
        handleButtonEditIdea();
    }

    async function handleDeleteIdea() {
        if(window.confirm('Tem certeza que deseja excluir esta ideia?')){
            if(myData.data?.user.id === data?.userId){
                const response = await api.delete(`/idea/${router.query.id}`);
                if(response.status.toString().startsWith('2')){
                    setIdeaStates({} as IdeaType);
                    refetch();
                    alert('Ideia excluída com sucesso!');
                    router.back();
                } else {
                    alert('Erro ao excluir ideia. Tente novamente mais tarde.');
                }
            } else {
                alert('Você não pode deletar esta ideia.');
            }
        }
    }

    async function handleGoToPlans() {
        alert('Em breve!');
    }

    useEffect(() => {
        if(isFetched && data){
            setIdeaStates({
                title: data.title,
                description: data.description,
                openEditModal: false
            })
        }
    }, [data, isFetched])
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isFetched && data && (
                        <div>
                            <div className='flex justify-between'>    
                                <div className='flex items-center space-x-2'>
                                    <button onClick={goBack} className="ri-arrow-left-s-line ri-3x"/>                   
                                    <h1 className={textTitle}>{data.title}</h1>   
                                </div> 
                                {/* <button onClick={useButtonStar} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                                */} 
                            </div>
                            
                            
                            { myData.data?.type === 'startup' && myData.data.user.id !== data.userId && (
                                <div>
                                    <h1 className={textStyle}>Descrição:</h1>                            
                                    <h1 className='line-clamp-3'>{data.description}...</h1>
                                </div>
                            )}

                            { myData.data && myData.data.user.id === data.userId && (
                                <div>
                                    <h1 className={textStyle}>Descrição:</h1>                            
                                    <h1>{data.description}</h1>
                                </div>
                            ) }
                            
                            {/* 
                            <h1 className={textStyle}>Solução:</h1> 
                            <h1>{data.solution}</h1> */}                            

{/*                         <h1 className={textStyle}>Problema:</h1> 
                            <h1>{data.problem}</h1> */}
                            
                            { myData.data?.type === 'cliente' && myData.data.user.id === data.userId && (
                                <div className='pt-4 text-right space-x-5'>
                                    <Button
                                        bg='bg-greenDark' 
                                        rounded='rounded-lg' 
                                        w='w-36' 
                                        h='h-12' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={handleButtonEditIdea}
                                    >
                                        EDITAR
                                    </Button>

                                    <Button
                                        bg='bg-warning' 
                                        rounded='rounded-lg' 
                                        w='w-36' 
                                        h='h-12' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={handleDeleteIdea}
                                    >
                                        EXCLUIR
                                    </Button>
                                </div>
                            ) }
                            {myData.data?.type === 'admin' && myData.data.user.id !== data.userId  &&  (
                                <div className='pt-4 text-right space-x-5'>
                                    <Button
                                        bg='bg-greenDark' 
                                        rounded='rounded-lg' 
                                        w='w-36' 
                                        h='h-12' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={() => handleActionIdea(data.userId, data.id, 'aproved')}
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
                                        onClick={() => handleActionIdea(data.userId, data.id, 'recused')}
                                    >
                                        RECUSAR
                                    </Button>
                                </div>     
                            )}                            
                        
                            { myData.data?.type === 'startup' && myData.data.user.id !== data.userId && (
                                <div className='pt-8 text-center space-x-5'>
                                    <Button
                                        bg='bg-greenText' 
                                        rounded='rounded-lg' 
                                        w='w-96' 
                                        h='h-16' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={handleGoToPlans}
                                    >
                                        ASSINE PARA VER MAIS...
                                    </Button>
                                </div>
                            ) } 
                            <Modal 
                                isOpen={ideaStates.openEditModal} 
                                onClose={handleButtonEditIdea} 
                                title='Editar ideia'
                                footer={
                                    <Button 
                                        bg='bg-greenDark' 
                                        rounded='rounded' 
                                        w='w-full' 
                                        h='h-12' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={handleEditIdea}
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
                                        value={ideaStates.title}
                                        onChange={(e) => setIdeaStates({...ideaStates, title: e.target.value})}    
                                    />

                                    <TextArea 
                                        haslabel 
                                        label='Descrição' 
                                        placeholder='ex: Sistema de purificação de água'
                                        value={ideaStates.description}
                                        onChange={(e) => setIdeaStates({...ideaStates, description: e.target.value})}    
                                        top='mt-2'                                        
                                    />
                                </div>

                            </Modal>
                        </div>
                    )}         
                </div>
            </div> 
            
        </Stack>
    );
}