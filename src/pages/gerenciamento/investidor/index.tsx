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

export default function Investidor() {
    const myData = useMyData();
    const { isLoading, isFetching, data } = useAllUsers();

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    <div>
                        <div className='flex'>    
                            <div className='flex items-center justify-center'>                 
                                <h1 className={textTitle}>Investidores</h1>   
                                { isLoading || isFetching && (<Spinner size='sm' color='#1A662A' className='ml-5'/>) }
                            </div> 
                        </div>

                        <TableContainer mt="10">
                            <Table variant='simple'>
                                <TableCaption>Investidores AgroI9</TableCaption>

                                <Thead>
                                    <Tr>
                                        <Th>Grupo de investimento</Th>
                                        <Th>Representante</Th>
                                        <Th isNumeric>Número de membros</Th>
                                        <Th>Plano</Th>
                                    </Tr>
                                </Thead>

                                { isLoading || isFetching ? (null) : (
                                    <Tbody>
                                        {data?.filter(el => el.investor).map((user) => (
                                            <Tr key={user.id}>
                                                <Th>{parseInt(user.investor.qtdMembers) === 1 ? 'Pessoa física' : user.investor.companyName}</Th>
                                                <Th>{user.name}</Th>
                                                <Th isNumeric>{user.investor.qtdMembers}</Th>
                                                <Th>{user.planName === 'default' ? 'Nenhum' : user.planName}</Th>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                ) }
                            </Table>
                        </TableContainer>
                    </div>    
                </div> 
            </div> 
        </Stack>
    );
}