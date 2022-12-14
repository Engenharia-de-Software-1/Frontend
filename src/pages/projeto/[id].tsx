import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { usePlans } from '../../services/queryClient/usePlans';
import { useProjects } from '../../services/queryClient/useProject';

type ProjectType = {
    title: string;
    solution: string;
    problem: string;
    openEditModal: boolean;
}

export default function Project() {    
    const router = useRouter();
    const [projectStates, setProjectStates] = useState<ProjectType>({ } as ProjectType);

    const myData = useMyData();
    const plans = usePlans();
    const { data, isFetched, refetch } = useOneProject(router.query.id as string);
    const [canInvest, setCanInvest] = useState(false);
    const [canRead, setCanRead] = useState(false);
    const [email, setEmail] = useState('');
    const projects = useProjects();
    
    function handleButtonEditProject(){
        setProjectStates({...projectStates, openEditModal: !projectStates.openEditModal});
    }

    async function getEmail(){
        await api.get(`/startup/${data?.userId}`).then(response => {
            setEmail(response.data.email);
        })
    }

    async function handleGoToPlan(){
        router.push(`/assinaturas`);
    }

    function goBack(){
        router.back();
    }

    async function handleActionProject(projectOwner: string, id: string, situation: string) {
        if(myData.data?.type === 'admin'){
            let text = situation === 'aproved' ? 'aprovar' : 'recusar';
            if(window.confirm(`Tem certeza que deseja ${text} esse projeto?`)) {
                const response = await api.put(`/project/${projectOwner}/${router.query.id}`, { situation });
                if(!response.status.toString().startsWith('2')){
                    alert('Erro ao recusar projeto. Tente novamente mais tarde.');
                } else {
                    router.push('/pendentes/projetos')
                }
            }
        } else {
            alert('Voc?? n??o tem permiss??o para realizar essa a????o.');
        }
        refetch();
        projects.refetch();
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
                alert('Projeto editado com sucesso! Agora ele est?? aguardando a aprova????o de um administrador.');
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
                    alert('Projeto exclu??do com sucesso!');
                    router.back();
                } else {
                    alert('Erro ao excluir projeto. Tente novamente mais tarde.');
                }
            } else {
                alert('Voc?? n??o pode deletar este projeto.');
            }
        }
    }

    async function getPermissions() {
        if(plans.data && myData.data){
            const plan = plans.data.find(plan => plan.plan === myData.data.user.planName);
            if(plan){
                if(plan.permissions['invest']) {
                    setCanInvest(true);
                }
                if(plan.permissions['read']) {
                    setCanRead(true);
                }
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
            getPermissions();
            getEmail();
        }
    }, [data, isFetched, plans.data, router])
    
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
                            
                            
                            { myData.data?.type === 'investidor' && myData.data.user.id !== data.userId && (
                                <div>
                                    <h1 className={textStyle}>Solu????o:</h1>                            
                                    { !canRead ? (<h1 className='line-clamp-3'>{data.solution}...</h1>) : (<h1>{data.solution}</h1>) }
                                    <h1 className={textStyle}>Problema:</h1>                                    
                                    { !canRead ? (<h1 className='line-clamp-3'>{data.problem}...</h1>) : (<h1>{data.problem}</h1>) }
                                </div>
                            )}

                            { myData.data && myData.data.user.id === data.userId && (
                                <div>
                                    <h1 className={textStyle}>Solu????o:</h1>                            
                                    <h1>{data.solution}</h1>
                                    <h1 className={textStyle}>Problema:</h1>                                    
                                    <h1>{data.problem}</h1>
                                </div>
                            )}

                            { myData.data?.type === 'admin' && (
                                <div>
                                    <h1 className={textStyle}>Solu????o:</h1>                            
                                    <h1>{data.solution}</h1>
                                    <h1 className={textStyle}>Problema:</h1>                                    
                                    <h1>{data.problem}</h1>
                                </div>
                            )}
                            
                            { myData.data?.type === 'startup' && myData.data.user.id === data.userId && (
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
                                        onClick={() => handleActionProject(data.userId, data.id, 'aproved')}
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
                                        onClick={() => handleActionProject(data.userId, data.id, 'recused')}
                                    >
                                        RECUSAR
                                    </Button>
                                </div>     
                            )}  

                            { myData.data?.type === 'investidor' && myData.data.user.id !== data.userId && canInvest && (
                                <div className='pt-4 text-right space-x-5 mb-10'>
                                    <p>Para contato com a startup: {email}</p>
                                </div>
                            ) }                            
                        
                            { myData.data?.type === 'investidor' && myData.data.user.id !== data.userId && (!canInvest || !canRead) && (
                                <div className='pt-8 text-center space-x-5'>
                                    <Button
                                        bg='bg-greenText' 
                                        rounded='rounded-lg' 
                                        w='w-96' 
                                        h='h-16' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={handleGoToPlan}
                                    >
                                        { !canInvest && !canRead ? 'ASSINE PARA VER MAIS E INVESTIR...' : !canInvest ? 'ASSINE PARA INVESTIR...' : 'ASSINE PARA VER MAIS...' }
                                    </Button>
                                </div>
                            ) } 
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
                                        label='Solu????o' 
                                        placeholder='ex: Sistema de purifica????o de ??gua'
                                        value={projectStates.solution}
                                        onChange={(e) => setProjectStates({...projectStates, solution: e.target.value})}    
                                        top='mt-2'                                        
                                    />

                                    <TextArea  
                                        haslabel 
                                        label='Problema' 
                                        placeholder='ex: ??gua n??o putificada'
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