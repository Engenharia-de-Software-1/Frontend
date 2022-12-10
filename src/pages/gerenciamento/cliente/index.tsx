import { Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';
import { useAllUsers } from '../../../services/queryClient/useAllUsers';
import { useIdeas } from '../../../services/queryClient/useIdea';
import { useMyData } from '../../../services/queryClient/useMyData';
import { divGeneral, textTitle } from '../styles';

export default function Cliente() { 
    const router = useRouter(); 
    const [id, setId] = useState('');
    const myData = useMyData();
    const { isLoading, isFetching, data } = useAllUsers();
    const { data: ideas, isLoading: ideasLoading, isFetching: ideasFetching } = useIdeas();
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal(id: string) {
        setId(id);
        setIsOpen(true);
    }

    function goToIdea(id: string) {
        router.push(`/ideias/dados/${id}`);
    }

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    <div>
                        <div className='flex'>    
                            <div className='flex items-center justify-center'>                 
                                <h1 className={textTitle}>Produtores Rurais</h1>   
                                { isLoading || isFetching && (<Spinner size='sm' color='#1A662A' className='ml-5'/>) }
                            </div> 
                        </div>

                        <TableContainer mt="10">
                            <Table variant='simple'>
                                <TableCaption>Produtores Rurais AgroI9</TableCaption>

                                <Thead>
                                    <Tr>
                                        <Th>Nome do produtor</Th>
                                        <Th isNumeric>Número de ideias</Th>
                                        <Th>Plano</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>

                                { isLoading || isFetching ? (null) : (
                                    <Tbody>
                                        {data?.filter(el => el.client).map((user) => (
                                            <Tr key={user.id}>
                                                <Th>{user.name}</Th>
                                                <Th isNumeric>{
                                                    ideasFetching || ideasLoading ? 
                                                        (<Spinner size='sm' color='#1A662A' className='ml-5'/>)
                                                    : ideas?.filter(el => el.userId === user.id).length
                                                }</Th>
                                                <Th>{user.planName === 'default' ? 'Nenhum' : user.planName}</Th>
                                                <Th>
                                                    <div className='flex'>
                                                        <button 
                                                            onClick={() => handleOpenModal(user.id)}
                                                            className='flex mr-2 bg-greenText p-2 px-5 rounded text-white'
                                                        >
                                                            Ver ideias
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
            <Modal isOpen={isOpen} footer={undefined} onClose={() => setIsOpen(false)} title='Ideias do produtor rural' size='5xl'>
                {ideasLoading || ideasFetching || !id ? (<Spinner/>) : ideas?.filter(el => el.userId === id && (el.situation === 'aproved' || el.situation === 'recused')).map((idea) => (
                    <div key={idea.id} className='w-full mt-5'>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>{idea.title}</h1>
                            <div className={idea.situation === 'aproved' ? 'flex ml-2 bg-greenLight text-greenText p-1 px-5 rounded-full' : 'flex ml-2 bg-[#ffc9bb] text-warning p-1 px-5 rounded-full'}>
                                <h1>{idea.situation === 'aproved' ? 'Aprovado' : 'Recusado' }</h1>
                            </div>
                        </div>
                        <p className='text-md font-regular mb-5'>{idea.description.substring(0, 100)}</p>
                        <div>
                            <button className='flex bg-greenText p-2 px-5 rounded text-white text-sm mb-5' onClick={() => goToIdea(idea.id)}>
                                Ver ideia
                            </button>
                        </div>
                        <div className='w-full h-px bg-[#f2f2f2]'/>
                    </div>
                ))}
            </Modal>
        </Stack>
    );
}