import { Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Modal } from '../../../components/Modal';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';
import { useAllUsers } from '../../../services/queryClient/useAllUsers';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useProjects } from '../../../services/queryClient/useProject';
import { divGeneral, textTitle } from '../styles';

export default function Startup() {  
    const router = useRouter();
    const myData = useMyData();
    const { isLoading, isFetching, data } = useAllUsers();
    const { data: project, isLoading: projectLoading, isFetching: projectFetching } = useProjects();

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
            <Modal isOpen={true} footer={undefined} onClose={() => {}} title='Projetos da startup' size='5xl'>
                
            </Modal>
        </Stack>
    );
}