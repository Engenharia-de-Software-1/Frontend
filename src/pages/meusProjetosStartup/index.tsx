import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../services/api';
import { IProject } from '../../models/IProject';
import { ButtonProject } from '../../components/ButtonProject';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { useProjects } from '../../services/queryClient/useProject';

export default function ProfileAdmin() {    
    const { isLoading, isFetching, data } = useProjects()
    const [project, setProject] = useState<IProject[] | any[]>([{}, {}] as IProject[]); 
    const [buttonAddProject, setButtonAddProject] = useState(false);

    const [nameProject, setNameProject] = useState<string>('');
    const [solutionProject, setSolutionProject] = useState<string>('');
    const [problemProject, setProblemProject] = useState<string>('');

    function useButtonAddProject(){
        setButtonAddProject(true);
    }
    
    useEffect(() => {

    }, [data, isLoading, isFetching])

    return ( 
        <Stack bg='bg-white'>
            <Sidebar/>

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
                        onClick={useButtonAddProject}
                    >
                        Adicionar projeto
                    </Button>
                </div>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {!isLoading && !isFetching && data?.map((project) => (
                        <ButtonProject key={project.id} project={project}/>
                    ))}         
                </div>
            </div> 
            <Modal 
                isOpen={buttonAddProject} 
                onClose={() => setButtonAddProject(false)} 
                title='Adicionar projeto'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={() => setButtonAddProject(false)}
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
                        value={nameProject}
                        onChange={(e) => setNameProject(e.target.value)}   
                    />

                    <TextArea 
                        haslabel 
                        label='Solução' 
                        placeholder='ex: Sistema de purificação de água'
                        value={solutionProject}
                        onChange={(e) => setSolutionProject(e.target.value)}
                        top='mt-2'                                        
                    />

                    <TextArea  
                        haslabel 
                        label='Problema' 
                        placeholder='ex: Água não putificada'
                        value={problemProject}
                        onChange={(e) => setProblemProject(e.target.value)}
                        top='mt-2'
                    />
                </div>

            </Modal>
        </Stack>
    );
}