import React, { useState } from 'react';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { useMyData } from '../../services/queryClient/useMyData';
import { Button } from '../../components/Button';
import { usePlans } from '../../services/queryClient/usePlans';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import api from '../../services/api';

type PlanType = {
    plan: string;
    value: number;
    read: boolean;
    invest: boolean;
    other: boolean;
    openAddModal: boolean;
}

export default function PlansAdmin() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = usePlans();
    const [planStates, setPlanStates] = useState<PlanType>({ } as PlanType);

    async function handleButtonAddPlan() {
        setPlanStates({...planStates, openAddModal: !planStates.openAddModal});
    }

    async function handleAddNewPlan() {
        if(planStates.plan){
            const response = await api.post('/plans', {
                ...planStates,
            });
            if(response.status.toString().startsWith('2')){
                setPlanStates({} as PlanType);
                refetch();
            } else {
                alert('Erro ao cadastrar plano. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
        handleButtonAddPlan();
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>  
                <div className='flex justify-between'>
                    <h1 className={textTitle}>Planos</h1>
                
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-40' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={handleButtonAddPlan}
                    >
                        Criar plano
                    </Button>
                </div>  

                <div className="grid grid-flow-row-dense grid-cols-3 mt-20">
                    {isLoading || isFetching && (<h1>Carregando planos...</h1>)}
                    {!isLoading && !isFetching && data?.length === 0 && (<h1>Não há nenhum plano aqui</h1>)}
                    {!isLoading && !isFetching && data?.map((plan) => (
                        <div key={plan.id} className='flex flex-col h-96 w-72 rounded bg-slate-100 p-10 justify-between'>
                            <h1 className='font-semibold text-xl w-462'>{plan.name}</h1>
                            <div className='mb-auto'>
                                <ul className='flex flex-col'>
                                    <li className='text-5xl font-semibold'>R$ {(plan.value/100)}</li>
                                    <span className='mt-5'>Esse plano inclui:</span>
                                    { plan.permissions.split(',').map((permission, index) => {
                                        if(permission.trim() === 'read') {
                                            return <li key={index} className='text-lg font-semibold'>- Leitura</li>
                                        } else if(permission.trim() === 'invest') {
                                            return <li key={index} className='text-lg font-semibold'>- Investimento</li>
                                        } else {
                                            return <li key={index} className='text-lg font-semibold'>- Escrita</li>
                                        }
                                    }) }
                                </ul>
                            </div>
                            <button className='flex h-10 rounded items-center justify-center w-full bg-[#F46262] text-white'>EXCLUIR</button>
                        </div>
                    ))}         
                </div>
            </div> 

            <Modal 
                isOpen={planStates.openAddModal} 
                onClose={handleButtonAddPlan} 
                title='Criar plano'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={handleAddNewPlan}
                    >
                        Salvar
                    </Button>
                }
            >
                <div className='flex flex-col'>
                    <Input 
                        haslabel 
                        label='Nome do plano' 
                        placeholder='ex: Basic' 
                        bg='bg-grayBg'     
                        value={planStates.plan}
                        onChange={(e) => setPlanStates({...planStates, plan: e.target.value})}   
                    />
                    <Input 
                        haslabel 
                        label='Valor do plano (em reais)' 
                        placeholder='ex: 80' 
                        top='mt-2'
                        bg='bg-grayBg'     
                        type='number'
                        step='0.01'
                        value={planStates.value}
                        onChange={(e) => setPlanStates({...planStates, value: parseInt(e.target.value)})}   
                    />
                    <div className='flex flex-col mt-2'>
                        <span className='text-sm'>Permissões</span>

                        <div className='flex flex-col mt-2'>
                            <div className='flex items-center'>
                                <input type='checkbox' checked={planStates.read} onChange={(e) => setPlanStates({...planStates, read: e.target.checked})} className='mr-2 form-checkbox h-4 w-4'/>
                                <span>Leitura de ideias e projetos</span>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' checked={planStates.invest} onChange={(e) => setPlanStates({...planStates, invest: e.target.checked})} className='mr-2 form-checkbox h-4 w-4'/>
                                <span>Poder investir em projetos</span>
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' checked={planStates.other} onChange={(e) => setPlanStates({...planStates, other: e.target.checked})} className='mr-2 form-checkbox h-4 w-4'/>
                                <span>Outra permissão</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Stack>
    );
}