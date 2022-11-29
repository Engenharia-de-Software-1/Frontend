import React, { useState } from 'react';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { useMyData } from '../../services/queryClient/useMyData';
import { Button } from '../../components/Button';
import { usePlans } from '../../services/queryClient/usePlans';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import api from '../../services/api';
import { divGeneral, textTitle } from '../../styles/plans.styles';

type PlanType = {
    plan: string;
    permissions: {
        [key: string]: boolean;
        read: boolean;
        invest: boolean;
        other: boolean;
    };
    openAddModal: boolean;
}

export default function PlansAdmin() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = usePlans();
    const [planStates, setPlanStates] = useState<PlanType>({ } as PlanType);
    const [value, setValue] = useState('');

    async function handleButtonAddPlan() {
        setPlanStates({...planStates, openAddModal: !planStates.openAddModal});
    }

    async function handleExcludePlan(plan: string) {
        await api.delete(`/plans`, { data: { id: plan }});
        refetch();
    }

    async function handleAddNewPlan() {
        if(planStates.plan){
            let createParams = planStates;
            createParams.permissions[`value-${value}`] = true;
            const response = await api.post('/plans', {
                ...createParams
            });
            if(response.status.toString().startsWith('2')){
                setPlanStates({} as PlanType);
                setValue('');
                refetch();
            } else {
                alert('Erro ao cadastrar plano. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
        document.location.reload();
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
                            <h1 className='font-semibold text-xl w-462'>{plan.plan}</h1>
                            <div className='mb-auto'>
                                <ul className='flex flex-col'>
                                    {Object.keys(plan.permissions).map((permission, i) => {
                                        if(permission !== 'read' && permission !== 'invest' && permission !== 'other'){
                                            return <li key={i} className='text-5xl font-semibold'>R$ {permission.split('value-')[1]}</li>
                                        }
                                    })}
                                    <span className='mt-5'>Esse plano inclui:</span>
                                    {plan.permissions['read'] && <li className='text-lg font-semibold'>- Leitura</li>}
                                    {plan.permissions['invest'] && <li className='text-lg font-semibold'>- Investimento</li>}
                                    {plan.permissions['other'] && <li className='text-lg font-semibold'>- Alguma outra coisa</li>}
                                </ul>
                            </div>
                            <button className='flex h-10 rounded items-center justify-center w-full bg-[#F46262] text-white' onClick={() => handleExcludePlan(plan.id)}>EXCLUIR</button>
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
                        label='Nome do plano (Será exibido para os usuários)' 
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
                        value={value}
                        onChange={(e) => setValue(e.target.value)}   
                    />
                    <div className='flex flex-col mt-2'>
                        <span className='text-sm'>Permissões</span>

                        <div className='flex flex-col mt-2'>
                            <div className='flex'>
                                <input type='checkbox' checked={planStates.permissions?.read} onChange={(e) => setPlanStates({...planStates, permissions: { ...planStates.permissions, read: e.target.checked }})} className='mr-2 mt-1 form-checkbox h-4 w-4'/>
                                <div>
                                    <h3>Leitura de ideias e projetos</h3>
                                    <span className='text-sm text-slate-400'>Startups podem assinar para ver ideias e investidores podem assinar para ver projetos</span>
                                </div>
                            </div>
                            <div className='flex mt-2'>
                                <input type='checkbox' checked={planStates.permissions?.invest} onChange={(e) => setPlanStates({...planStates, permissions: { ...planStates.permissions, invest: e.target.checked }})} className='mr-2 mt-1 form-checkbox h-4 w-4'/>
                                <div>
                                    <h3>Investimento em projetos</h3>
                                    <span className='text-sm text-slate-400'>Quando assinado por uma startup, seus projetos podem receber investimento. Quando assinado por um investidor, permite que esse invista em projetos.</span>
                                </div>
                            </div>
                            <div className='flex mt-2'>
                                <input type='checkbox' checked={planStates.permissions?.other} onChange={(e) => setPlanStates({...planStates, permissions: { ...planStates.permissions, other: e.target.checked }})} className='mr-2 mt-1 form-checkbox h-4 w-4'/>
                                <div>
                                    <h3>Outra permissão (a decidir)</h3>
                                    <span className='text-sm text-slate-400'>Descrição da permissão</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Stack>
    );
}