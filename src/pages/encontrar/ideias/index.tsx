import React, { useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from '../../../styles/encontrar.ideias.styles';
import { ButtonIdea } from '../../../components/ButtonIdea';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useIdeas } from '../../../services/queryClient/useIdea';
import { useFavIdeas } from '../../../services/queryClient/useFavIdeas';
import { get, set } from '../../../contexts/store';
import { IIdea } from '../../../models/IIdea';
import { useRouter } from 'next/router';

export default function SearchIdea() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useIdeas();
    const [historyIdea, setHistoryIdea] = useState<IIdea[]>([]);
    const favs = useFavIdeas();
    const router = useRouter();

    const [buttonCheck, setButtonCheck] = useState(false);

    function useButtonCheck() {
        let resp = get('@agroi9:historyIdea');
        let aux = data?.filter(el => el.situation === 'aproved');
        if(resp) {
            setHistoryIdea(JSON.parse(resp))
        } else if(aux && aux.length > 0) {
            setHistoryIdea(aux)
        }
        setButtonCheck(!buttonCheck);
    }

    function handleClickIdea(el: IIdea, index: number) {
        let aux = historyIdea.filter((_, i) => i !== index);
        aux.unshift(el);
        set('@agroi9:historyIdea', JSON.stringify(aux));
        setHistoryIdea(aux);
        router.push(`/ideias/dados/${el.id}`);
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className='flex justify-between items-center'>
                    <h1 className={textTitle}>Lista de ideias</h1>

                    <label className="flex items-center ">
                        <input onClick={useButtonCheck} type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" defaultChecked={buttonCheck} />
                        <span className="ml-2 text-gray-600">filtrar por visualizados por último</span>
                    </label>

                </div>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando ideias...</h1>)}
                    {!isLoading && !isFetching && (data?.length === 0 || data?.filter(el => el.situation === 'aproved').length === 0) && (<h1>Não há nenhuma ideia aqui</h1>)}
                    {!isLoading && !isFetching && !buttonCheck && data?.filter(el => el.situation === 'aproved').reverse().map((idea, i) => (
                        <ButtonIdea 
                            key={idea.id} 
                            idea={idea} 
                            userType={myData.data?.type as string} 
                            favorite={favs.data}
                            final={() => {
                                favs.refetch();
                                refetch();
                            }}
                            onClick={() => handleClickIdea(idea, 0)}
                        />
                    ))}      
                    {!isLoading && !isFetching && buttonCheck && historyIdea.filter(el => el.situation === 'aproved').map((idea, i) => (
                        <ButtonIdea 
                            key={idea.id} 
                            idea={idea} 
                            userType={myData.data?.type as string} 
                            favorite={favs.data}
                            final={() => {
                                favs.refetch();
                                refetch();
                            }}
                            onClick={() => handleClickIdea(idea, 0)}
                        />
                    ))}       
                </div>
            </div> 
        </Stack>
    );
}