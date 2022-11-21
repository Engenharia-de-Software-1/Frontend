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
    userId: string;
    openAddModal: boolean;
}

export default function PlansAdmin() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = usePlans();
    const [planStates, setPlanStates] = useState<PlanType>({ } as PlanType);

    async function handleButtonAddPlan(me: boolean) {
        if(me && myData.data?.user.id){
            setPlanStates({...planStates, openAddModal: !planStates.openAddModal, userId: myData.data?.user.id});
        } else {
            setPlanStates({...planStates, openAddModal: !planStates.openAddModal});
        }
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
        handleButtonAddPlan(false);
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
                        onClick={() => handleButtonAddPlan(true)}
                    >
                        Criar plano
                    </Button>
                </div>  

                <div className="flex items-center justify-center h-full overflow-y-hidden overflow-x">
                    {isLoading || isFetching && (<h1>Carregando planos...</h1>)}
                    {!isLoading && !isFetching && data?.length === 0 && (<h1>Não há nenhum plano aqui</h1>)}
                    {!isLoading && !isFetching && data?.map((plan) => (
                        <div key={plan.id} className='h-96 w-72 rounded bg-slate-100 p-10 ml-24'>
                            <h1 className='font-semibold text-3xl w-462'>{plan.name}</h1>
                        </div>
                    ))}         
                </div>
            </div> 

            <Modal 
                isOpen={planStates.openAddModal} 
                onClose={() => handleButtonAddPlan(false)} 
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
                </div>
            </Modal>
        </Stack>
    );
}