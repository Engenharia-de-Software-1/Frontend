import React, { useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../../services/api';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useIdeas } from '../../../services/queryClient/useIdea';
import { ButtonIdea } from '../../../components/ButtonIdea';
import { useFavIdeas } from '../../../services/queryClient/useFavIdeas';
import { useRouter } from 'next/router';
import SearchBar from '../../../components/SearchBar/indext';

export default function ProfileAdmin() {    
    const router = useRouter();
    const myData = useMyData();
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoading, isFetching, data, refetch } = useIdeas();
    const favs = useFavIdeas();

    function goToIdeas(id: string) {
        router.push(`/ideias/dados/${id}`);
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>    
                <h1 className={textTitle}>Ideias pendentes</h1>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando ideias...</h1>)}
                    {!isLoading && !isFetching && data?.filter(el => el.situation !== 'aproved' && el.situation !== 'recused').length === 0 && (<h1>Não há nenhuma ideia aqui</h1>)}
                    {!isLoading 
                    && !isFetching 
                    && data?.filter(el => el.situation !== 'aproved' && el.situation !== 'recused' && el.title.toLowerCase().includes(searchQuery)).map((idea) => (
                        <ButtonIdea
                            key={idea.id} 
                            idea={idea} 
                            userType={myData.data?.type as string}
                            onClick={() => goToIdeas(idea.id)}
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