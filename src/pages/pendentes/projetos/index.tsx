import React from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../../services/api';
import { ButtonProject } from '../../../components/ButtonProject';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useProjects } from '../../../services/queryClient/useProject';

export default function ProfileAdmin() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useProjects();

    async function handleActionProject(projectOwner: string, id: string, situation: string) {
        if(myData.data?.type === 'admin'){
            const response = await api.put(`/project/${projectOwner}/${id}`, { situation });
            if(response.status.toString().startsWith('2')){
                refetch();
            } else {
                alert('Erro ao recusar projeto. Tente novamente mais tarde.');
            }
        } else {
            alert('Você não tem permissão para realizar essa ação.');
        }
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>    
                <h1 className={textTitle}>Projetos pendentes</h1>
               
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando projetos...</h1>)}
                    {!isLoading && !isFetching && data?.length === 0 && (<h1>Não há nenhum projeto aqui</h1>)}
                    {!isLoading && !isFetching && data?.filter(el => el.situation !== 'aproved').map((project) => (
                        <ButtonProject 
                            key={project.id} 
                            project={project} 
                            userType={myData.data?.type as string}
                            recuseProject={() => handleActionProject(project.userId, project.id, 'recused')}
                            acceptProject={() => handleActionProject(project.userId, project.id, 'aproved')}
                        />
                    ))}         
                </div>
            </div> 
            
        </Stack>
    );
}