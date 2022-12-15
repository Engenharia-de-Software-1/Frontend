import { Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';
import { useAllUsers } from '../../../services/queryClient/useAllUsers';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useProjects } from '../../../services/queryClient/useProject';
import { divGeneral, textTitle } from '../styles';

export default function Startup() { 
    const router = useRouter(); 
    const [id, setId] = useState('');
    const myData = useMyData();
    const { isLoading, isFetching, data } = useAllUsers();
    const { data: project, isLoading: projectLoading, isFetching: projectFetching, refetch } = useProjects();
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal(id: string) {
        setId(id);
        setIsOpen(true);
    }

    function goToProject(id: string) {
        router.push(`/projeto/${id}`);
    }

    console.log(data)

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    <div>
                        <div className='flex'>    
                            <div className='flex items-center justify-center'>                 
                                <h1 className={textTitle}>Startups</h1>   
                                { isLoading || isFetching && (<Spinner size='sm' color='#1A662A' className='ml-5'/>) }
                            </div> 
                        </div>

                        <TableContainer mt="10">
                            <Table variant='simple'>
                                <TableCaption>Startups AgroI9</TableCaption>

                                <Thead>
                                    <Tr>
                                        <Th>Nome da startup</Th>
                                        <Th>Representante</Th>
                                        <Th isNumeric>Número de projetos</Th>
                                        <Th>Plano</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>

                                { isLoading || isFetching ? (null) : (
                                    <Tbody>
                                        {data?.filter(el => el.startup).map((user) => (
                                            <Tr key={user.id}>
                                                <Th>{user.startup.startupName}</Th>
                                                <Th>{user.name}</Th>
                                                <Th isNumeric>{
                                                    projectFetching || projectLoading ? 
                                                        (<Spinner size='sm' color='#1A662A' className='ml-5'/>)
                                                    : project?.filter(el => el.userId === user.id).length
                                                }</Th>
                                                <Th>{user.planName === 'default' ? 'Nenhum' : user.planName}</Th>
                                                <Th>
                                                    <div className='flex'>
                                                        <button 
                                                            onClick={() => handleOpenModal(user.id)}
                                                            className='flex mr-2 bg-greenText p-2 px-5 rounded text-white'
                                                        >
                                                            Ver projetos
                                                        </button>
                                                    </div>
                                                </Th>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                ) }
                            </Table>
                        </TableContainer>
                    </div>    
                </div> 
            </div> 
            <Modal isOpen={isOpen} footer={undefined} onClose={() => setIsOpen(false)} title='Projetos da startup' size='5xl'>
                <button onClick={() => refetch()}>Atualizar</button>
                {projectLoading || projectFetching || !id ? (<Spinner/>) : project?.filter(el => el.userId === id && (el.situation === 'aproved' || el.situation === 'recused')).map((project) => (
                    <div key={project.id} className='w-full mt-5'>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>{project.title}</h1>
                            <div className={project.situation === 'aproved' ? 'flex ml-2 bg-greenLight text-greenText p-1 px-5 rounded-full' : 'flex ml-2 bg-warning text-white p-1 px-5 rounded-full'}>
                                <h1>{project.situation === 'aproved' ? 'Aprovado' : 'Recusado' }</h1>
                            </div>
                        </div>
                        <p className='text-md font-regular mb-5'>{project.solution.substring(0, 100)}</p>
                        <div>
                            <button className='flex bg-greenText p-2 px-5 rounded text-white text-sm mb-5' onClick={() => goToProject(project.id)}>
                                Ver projeto
                            </button>
                        </div>
                        <div className='w-full h-px bg-[#f2f2f2]'/>
                    </div>
                ))}
            </Modal>
        </Stack>
    );
}