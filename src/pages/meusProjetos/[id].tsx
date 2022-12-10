import React, { useEffect, useState } from 'react';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { ButtonProject } from '../../components/ButtonProject';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { useMyProjects } from '../../services/queryClient/useMyProject';
import { useRouter } from 'next/router';
import api from '../../services/api';
import { useMyData } from '../../services/queryClient/useMyData';
import SearchBar from '../../components/SearchBar/indext';

type ProjectType = {
    title: string;
    solution: string;
    problem: string;
    openAddModal: boolean;
}

export default function ProfileAdmin() {  
    const router = useRouter();  
    const myData = useMyData();
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoading, isFetching, data, refetch } = useMyProjects(router.query.id as string);

    const [projectStates, setProjectStates] = useState<ProjectType>({ } as ProjectType);

    function handleButtonAddProject(){
        setProjectStates({...projectStates, openAddModal: !projectStates.openAddModal});
    }

    async function handleAddNewProject() {
        if(projectStates.title && projectStates.problem && projectStates.solution){
            const response = await api.post('/project', {
                ...projectStates,
                userId: router.query.id
            });
            if(response.status.toString().startsWith('2')){
                refetch();
                setProjectStates({...projectStates, openAddModal: false, title: '', solution: '', problem: '' });
            } else {
                alert('Erro ao cadastrar projeto. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    useEffect(() => {
        refetch();
    }, [router, refetch, data])

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className='flex justify-between'>
                    <h1 className={textTitle}>Meus Projetos</h1>

                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-40' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={handleButtonAddProject}
                    >
                        Adicionar projeto
                    </Button>
                </div>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando projetos...</h1>)}
                    {!isLoading && !isFetching && data?.length === 0 && (<h1>Não há nenhum projeto aqui</h1>)}
                    {!isLoading && 
                    !isFetching && 
                    data?.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))?.map((project) => (
                        <ButtonProject key={project.id} project={project} userType={myData.data?.type as string}/>
                    ))}
                </div>
            </div> 
            <Modal
                isOpen={projectStates.openAddModal} 
                onClose={handleButtonAddProject} 
                title='Adicionar projeto'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={handleAddNewProject}
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
        </Stack>
    );
}