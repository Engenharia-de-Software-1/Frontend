import { useRouter } from 'next/router';
import React from 'react';
import api from '../../services/api';
import { useIdeas } from '../../services/queryClient/useIdea';
import { useMyData } from '../../services/queryClient/useMyData';
import { usePlans } from '../../services/queryClient/usePlans';
import { useProjects } from '../../services/queryClient/useProject';

interface IAssinaturasProps {}

export default function Assinaturas({}: IAssinaturasProps) {
  const router = useRouter();
  const myData = useMyData();
  const plans = usePlans();
  const projects = useProjects();
  const ideas = useIdeas();

  async function subscribe(planName: string) {
    try {
      const link = myData.data?.type === 'startup' ? 'startup' : myData.data?.type === 'investidor' ? 'investor' : 'client';
      const output = await api.put(`${link}`, {
        planName
      });
      if(output.data && output.data.id) {
        alert('Plano adquirido com sucesso!');
        myData.refetch();
        plans.refetch();
        projects.refetch();
        ideas.refetch();
        if(myData.data?.type === 'startup') {
          router.push(`/encontrar/ideias`);
        } else if(myData.data?.type === 'investidor') {
          router.push(`/encontrar/projetos`);
        }
      } else {
        alert('Erro ao atualizar dados!');
      }
    } catch (error) {
      alert('Erro retornado!');
    }
  }

  function goBack() {
    router.back();
  }

  return(
    <div className='flex flex-col p-24'>
      <h1 className='text-4xl font-bold'>Assinaturas</h1>
      <div className='w-full h-px bg-slate-200 mt-10'/>
      <div className='w-full flex items-center h-full mt-10'>
        {plans.data?.map((plan, i) => {
          let readOption = myData.data?.type === 'investidor' ? 'Ler projetos' : 'Ler ideias';
          let investOption = myData.data?.type === 'investidor' ? 'Investir em projetos' : 'Poder receber investimentos';
          if(i === 1) {
            return(
              <div key={plan.id} className='flex flex-col mt-10 p-10 w-1/3 mx-20 rounded-2xl h-559 bg-greenText'>
                <div className='flex justify-between'>
                  <h3 className='text-xl font-semibold text-buttonPlans'>Plano {plan.plan}</h3>
                  <div className='px-5 rounded-full bg-buttonPlans text-greenText items-center flex'>
                    <span>Popular</span>
                  </div>
                </div>
                <div className='flex flex-col justify-center mt-5 text-white'>
                  {Object.keys(plan.permissions).map((permission, i) => {
                    if(permission !== 'read' && permission !== 'invest' && permission !== 'other'){
                      return <h1 key={i}className='text-5xl font-bold'>R$ {permission.split('value-')[1]}</h1>
                    }
                  })}
                  <h3>por mês</h3>
                </div>
                <button className='mt-10 bg-buttonPlans h-12 rounded text-greenText' onClick={() => subscribe(plan.plan)}>Escolher esse</button>
                <div className='mt-10 text-white'>
                  <h3 className='text-lg font-bold'>BENEFÍCIOS</h3>
                  <span className='text-sm'>Tudo o que você tem direito</span>
                  {plan.permissions['read'] && (
                    <div className='mt-5 flex items-center'>
                      <div className='w-4 h-4 bg-buttonPlans rounded-full mr-2'/> <span>{readOption}</span>
                    </div>
                  )}
                  {plan.permissions['invest'] && (
                    <div className='mt-5 flex items-center'>
                      <div className='w-4 h-4 bg-buttonPlans rounded-full mr-2'/> <span>{investOption}</span>
                    </div>
                  )}
                  {plan.permissions['other'] && (
                    <div className='mt-5 flex items-center'>
                      <div className='w-4 h-4 bg-buttonPlans rounded-full mr-2'/> <span>Outra possibilidade</span>
                    </div>
                  )}
                </div>
              </div>
            )
          }
          return(
            <div key={plan.id} className='flex flex-col mt-10 p-10 w-1/3 mx-20 rounded-2xl h-559 border'>
              <h3 className='text-xl font-semibold'>Plano {plan.plan}</h3>
              <div className='flex flex-col justify-center mt-5'>
                {Object.keys(plan.permissions).map((permission, i) => {
                  if(permission !== 'read' && permission !== 'invest' && permission !== 'other'){
                    return <h1 key={i}className='text-5xl font-bold'>R$ {permission.split('value-')[1]}</h1>
                  }
                })}
                <h3 className='text-slate-500'>por mês</h3>
              </div>
              <button className='mt-10 bg-greenText h-12 rounded text-white' onClick={() => subscribe(plan.plan)}>Escolher esse</button>
              <div className='mt-10'>
                <h3 className='text-lg font-bold'>BENEFÍCIOS</h3>
                <span className='text-slate-500 text-sm'>Tudo o que você tem direito</span>
                {plan.permissions['read'] && (
                  <div className='mt-5 flex items-center'>
                    <div className='w-4 h-4 bg-greenText rounded-full mr-2'/> <span>{readOption}</span>
                  </div>
                )}
                {plan.permissions['invest'] && (
                  <div className='mt-5 flex items-center'>
                    <div className='w-4 h-4 bg-greenText rounded-full mr-2'/> <span>{investOption}</span>
                  </div>
                )}
                {plan.permissions['other'] && (
                  <div className='mt-5 flex items-center'>
                    <div className='w-4 h-4 bg-greenText rounded-full mr-2'/> <span>Outra possibilidade</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className='w-full mt-10 flex items-center justify-center'>
        <button className='underline text-greenText font-semibold' onClick={goBack}>Não desejo escolher um plano atualmente...</button>
      </div>
    </div>
  );
}