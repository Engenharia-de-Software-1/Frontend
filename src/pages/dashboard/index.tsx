import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Stack } from '../../components/Stack';
import api from '../../services/api';
import { useIdeas } from '../../services/queryClient/useIdea';
import { IResponse, useMyData } from '../../services/queryClient/useMyData';
import { usePlans } from '../../services/queryClient/usePlans';
import { useProjects } from '../../services/queryClient/useProject';
import { divGeneral } from './styles';

 interface DashboarProps {
    data: IResponse | undefined;
} 

export default function Dashboard({ data }: DashboarProps) {  
    const router = useRouter();
    const myData = useMyData();
    const { data: project } = useProjects();
    const { data: idea } = useIdeas();
    const { data: plans } = usePlans();

    function handleGoToSubscriptions() {
        router.push('/assinaturas');
    }

    async function handleCancelPlan() {
        try {
            const link = myData.data?.type === 'startup' ? 'startup' : myData.data?.type === 'investidor' ? 'investor' : 'client';
            await api.put(`${link}`, {
                planName: 'default'
            });
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <h1 className='font-semibold text-5xl'>Dashboard</h1>

                {myData?.data?.type === 'startup' && (       
                    <div>
                        <div className='flex'>
                            <div className='flex flex-col items-start justify-start bg-slate-100 w-fit mt-5 p-5 rounded'>
                                <h1 className='font-semibold text-xl'>Meu plano</h1>
                                <h1 className='text-md mt-2'>{myData?.data?.user.planName === 'default' ? 'Nenhum' : myData?.data?.user.planName}</h1>
                                <button 
                                    onClick={handleGoToSubscriptions}
                                    className='mt-2 bg-greenText w-full text-white text-sm p-2 px-5 rounded transition-all duration-300 hover:opacity-75'
                                >
                                    Mudar plano
                                </button>
                                { myData?.data?.user.planName !== 'default' && (
                                    <button 
                                        onClick={handleCancelPlan}
                                        className='mt-2 bg-warning w-full text-white text-sm p-2 px-5 rounded transition-all duration-300 hover:opacity-75'
                                    >
                                        Cancelar plano
                                    </button>
                                ) }
                            </div>

                            <div className='flex flex-col items-start justify-start bg-slate-100 w-fit mt-5 p-5 rounded ml-5'>
                                <h1 className='font-semibold text-xl'>Suas permissões</h1>
                            
                                {plans?.filter(el => el.plan === myData?.data?.user.planName).map(plan => {
                                    let readOption = myData.data?.type === 'investidor' ? 'Ler projetos' : 'Ler ideias';
                                    let investOption = myData.data?.type === 'investidor' ? 'Investir em projetos' : 'Poder receber investimentos';
                                    return(
                                        <div>
                                            {plan.permissions['read'] && (
                                                <div className='mt-2 flex items-center'>
                                                    <div className='w-2 h-2 bg-greenText rounded-full mr-2'/> <span>{readOption}</span>
                                                </div>
                                            )}
                                            {plan.permissions['invest'] && (
                                                <div className='mt-2 flex items-center'>
                                                    <div className='w-2 h-2 bg-greenText rounded-full mr-2'/> <span>{investOption}</span>
                                                </div>
                                            )}
                                            {plan.permissions['other'] && (
                                                <div className='mt-2 flex items-center'>
                                                    <div className='w-2 h-2 bg-greenText rounded-full mr-2'/> <span>Outra possibilidade</span>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <TableContainer mt="10">
                        <Table  variant='striped' colorScheme='gray'>
                            <TableCaption>Projetos AgroI9</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Lista de projetos</Th>
                                    <Th>Estado</Th>
                                    <Th isNumeric>Número de visualizações</Th>
                                </Tr>
                            </Thead>                       
                            <Tbody>
                                {project?.filter(el => el.userId === myData.data?.user.id).map((project) => (
                                    <Tr key={project.id}> 
                                        <Td>{project.title}</Td>
                                        <Td>{project.situation  === 'aproved' ? (
                                            <div className='bg-greenText text-white font-semibold text-sm w-fit px-2 py-px rounded'>
                                                <span>Aprovado</span>
                                            </div>
                                        ) : project.situation === 'recused' ? (
                                            <div className='bg-warning text-white font-semibold text-sm w-fit px-2 py-px rounded'>
                                                <span>Recusado</span>
                                            </div>
                                        ) : (
                                            <div className='bg-grayText text-white font-semibold text-sm w-fit px-2 py-px rounded'>
                                                <span>Pendente</span>
                                            </div>
                                        )} 
                                        </Td>
                                        <Td isNumeric>{project.views}</Td>
                                    </Tr>
                                ))}
                            </Tbody>                        
                        </Table>
                        </TableContainer>
                    </div>             
                )}

                {myData?.data?.type === 'investidor' && (       
                    
                    <div className='flex'>
                        <div className='flex flex-col items-start justify-start bg-slate-100 w-fit mt-5 p-5 rounded'>
                            <h1 className='font-semibold text-xl'>Meu plano</h1>
                            <h1 className='text-md mt-2'>{myData?.data?.user.planName === 'default' ? 'Nenhum' : myData?.data?.user.planName}</h1>
                            <button 
                                onClick={handleGoToSubscriptions}
                                className='mt-2 bg-greenText w-full text-white text-sm p-2 px-5 rounded transition-all duration-300 hover:opacity-75'
                            >
                                Mudar plano
                            </button>
                            { myData?.data?.user.planName !== 'default' && (
                                <button 
                                    onClick={handleCancelPlan}
                                    className='mt-2 bg-warning w-full text-white text-sm p-2 px-5 rounded transition-all duration-300 hover:opacity-75'
                                >
                                    Cancelar plano
                                </button>
                            ) }
                        </div>

                        <div className='flex flex-col items-start justify-start bg-slate-100 w-fit mt-5 p-5 rounded ml-5'>
                            <h1 className='font-semibold text-xl'>Suas permissões</h1>
                        
                            {plans?.filter(el => el.plan === myData?.data?.user.planName).map(plan => {
                                let readOption = myData.data?.type === 'investidor' ? 'Ler projetos' : 'Ler ideias';
                                let investOption = myData.data?.type === 'investidor' ? 'Investir em projetos' : 'Poder receber investimentos';
                                return(
                                    <div>
                                        {plan.permissions['read'] && (
                                            <div className='mt-2 flex items-center'>
                                                <div className='w-2 h-2 bg-greenText rounded-full mr-2'/> <span>{readOption}</span>
                                            </div>
                                        )}
                                        {plan.permissions['invest'] && (
                                            <div className='mt-2 flex items-center'>
                                                <div className='w-2 h-2 bg-greenText rounded-full mr-2'/> <span>{investOption}</span>
                                            </div>
                                        )}
                                        {plan.permissions['other'] && (
                                            <div className='mt-2 flex items-center'>
                                                <div className='w-2 h-2 bg-greenText rounded-full mr-2'/> <span>Outra possibilidade</span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>                                
                )}

                {myData?.data?.type === 'cliente' && (       
                    <div>            
                        <TableContainer mt="10">
                        <Table  variant='striped' colorScheme='gray'>
                            <TableCaption>Produtor rural AgroI9</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Lista de ideia</Th>
                                    <Th>Estado</Th>
                                    <Th isNumeric>Número de visualizações</Th>
                                    <Th isNumeric>Número de favoritado</Th>
                                </Tr>
                            </Thead>                       
                            <Tbody>
                                {idea?.filter(el => el.userId === myData.data?.user.id).map((idea) => (
                                    <Tr key={idea.id}>                                 
                                        <Td>{idea.title}</Td>
                                        <Td>{idea.situation === 'aproved' ? (
                                            <div className='bg-greenText text-white font-semibold text-sm w-fit px-2 py-px rounded'>
                                                <span>Aprovado</span>
                                            </div>
                                        ) : idea.situation === 'recused' ? (
                                            <div className='bg-warning text-white font-semibold text-sm w-fit px-2 py-px rounded'>
                                                <span>Recusado</span>
                                            </div>
                                        ) : (
                                            <div className='bg-grayText text-white font-semibold text-sm w-fit px-2 py-px rounded'>
                                                <span>Pendente</span>
                                            </div>
                                        )}
                                        </Td>
                                        <Td isNumeric>{idea.views}</Td>
                                        <Td isNumeric>{idea.favorites}</Td>
                                    </Tr>
                                ))}
                            </Tbody>                        
                        </Table>
                        </TableContainer>
                    </div>             
                )}
            </div>        
        </Stack>
    );
}

