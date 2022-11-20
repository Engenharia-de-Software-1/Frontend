import React from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../../services/api';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useIdeas } from '../../../services/queryClient/useIdea';
import { ButtonIdea } from '../../../components/ButtonIdea';
import { useFavIdeas } from '../../../services/queryClient/useFavIdeas';

export default function ProfileAdmin() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useIdeas();
    const favs = useFavIdeas();

    async function handleActionIdea(id: string, situation: string) {
        if(myData.data?.type === 'admin'){
            const response = await api.put(`/idea/situation/${id}`, { situation });
            if(response.status.toString().startsWith('2')){
                refetch();
            } else {
                alert('Erro ao recusar ideia. Tente novamente mais tarde.');
            }
        } else {
            alert('Você não tem permissão para realizar essa ação.');
        }
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>    
                <h1 className={textTitle}>Ideias pendentes</h1>
               
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando ideias...</h1>)}
                    {!isLoading && !isFetching && data?.length === 0 && (<h1>Não há nenhuma ideia aqui</h1>)}
                    {!isLoading && !isFetching && data?.filter(el => el.situation !== 'aproved').map((idea) => (
                        <ButtonIdea
                            key={idea.id} 
                            idea={idea} 
                            userType={myData.data?.type as string}
                            recuseIdea={() => handleActionIdea(idea.id, 'recused')}
                            acceptIdea={() => handleActionIdea(idea.id, 'aproved')}
                            final={() => {
                                favs.refetch();
                                refetch();
                            }}
                        />
                    ))}         
                </div>
            </div> 
            
        </Stack>
    );
}