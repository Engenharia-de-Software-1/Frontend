import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textStyle, textTitle } from './styles';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { useMyData } from '../../services/queryClient/useMyData';
import { useOneProject } from '../../services/queryClient/useOneProject';
import api from '../../services/api';

type ProjectType = {
    title: string;
    solution: string;
    problem: string;
    openEditModal: boolean;
}

export default function ProfileAdmin() {    
    const [projectStates, setProjectStates] = useState<ProjectType>({ } as ProjectType);

    const myData = useMyData();
    const { data, isFetched, refetch } = useOneProject(router.query.id as string);
    
    
    /* const [starButton, setStarButton] = useState(false);
    function useButtonStar() {
        setStarButton(!starButton);
    } */
    function handleButtonEditProject(){
        setProjectStates({...projectStates, openEditModal: !projectStates.openEditModal});
    }

    function goBack(){
        router.back();
    }

    async function handleEditProject() {
        if(projectStates.title && projectStates.problem && projectStates.solution){
            const response = await api.put(`/project/${myData.data?.user.id}/${router.query.id}`, {
                ...projectStates,
                userId: myData.data?.user.id,
                situation: 'pending'
            });
            if(response.status.toString().startsWith('2')){
                setProjectStates({} as ProjectType);
                refetch();
                alert('Projeto editado com sucesso! Agora ele está aguardando a aprovação de um administrador.');
            } else {
                alert('Erro ao cadastrar projeto. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
        handleButtonEditProject();
    }

    async function handleDeleteProject() {
        if(window.confirm('Tem certeza que deseja excluir este projeto?')){
            if(myData.data?.user.id === data?.userId){
                const response = await api.delete(`/project/${myData.data?.user.id}/${router.query.id}`);
                if(response.status.toString().startsWith('2')){
                    setProjectStates({} as ProjectType);
                    refetch();
                    alert('Projeto excluído com sucesso!');
                    router.back();
                } else {
                    alert('Erro ao excluir projeto. Tente novamente mais tarde.');
                }
            } else {
                alert('Você não pode deletar este projeto.');
            }
        }
    }

    useEffect(() => {
        if(isFetched && data){
            setProjectStates({
                title: data.title,
                solution: data.solution,
                problem: data.problem,
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
                        
                            <h1 className={textStyle}>Solução:</h1>                            
                            <h1>{data.solution}</h1>

                            <h1 className={textStyle}>Problema:</h1>
                            <h1>{data.problem}</h1>
                            
                            <div className='pt-4 text-right space-x-5'>
                                <Button
                                    bg='bg-greenDark' 
                                    rounded='rounded-lg' 
                                    w='w-36' 
                                    h='h-12' 
                                    textColor='text-white' 
                                    textWeight='font-bold'
                                    onClick={handleButtonEditProject}
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
                                    onClick={handleDeleteProject}
                                >
                                    EXCLUIR
                                </Button>
                            </div>
                            
                        
                            <Modal 
                                isOpen={projectStates.openEditModal} 
                                onClose={handleButtonEditProject} 
                                title='Editar projeto'
                                footer={
                                    <Button 
                                        bg='bg-greenDark' 
                                        rounded='rounded' 
                                        w='w-full' 
                                        h='h-12' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={handleEditProject}
                                    >
                                        Salvar
                                    </Button>
                                }
                            >
                                <div className='flex flex-col'>
                                    <Input 
                                        haslabel 
                                        label='Nome do projeto' 
                                        placeholder='ex: Agro' 
                                        bg='bg-grayBg'     
                                        value={projectStates.title}
                                        onChange={(e) => setProjectStates({...projectStates, title: e.target.value})}    
                                    />

                                    <TextArea 
                                        haslabel 
                                        label='Solução' 
                                        placeholder='ex: Sistema de purificação de água'
                                        value={projectStates.solution}
                                        onChange={(e) => setProjectStates({...projectStates, solution: e.target.value})}    
                                        top='mt-2'                                        
                                    />

                                    <TextArea  
                                        haslabel 
                                        label='Problema' 
                                        placeholder='ex: Água não putificada'
                                        value={projectStates.problem}
                                        onChange={(e) => setProjectStates({...projectStates, problem: e.target.value})}    
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