import React, { useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { ButtonIdea } from '../../../components/ButtonIdea';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useIdeas } from '../../../services/queryClient/useIdea';
import { useFavIdeas } from '../../../services/queryClient/useFavIdeas';
import { get, set } from '../../../contexts/store';
import { IIdea } from '../../../models/IIdea';

export default function SearchIdea() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useIdeas();
    const [historyIdea, setHistoryIdea] = useState<IIdea[]>([]);
    const favs = useFavIdeas();

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

    function handleClickIdea(el: IIdea) {
        let resp = get('@agroi9:historyIdea');
        if(resp) {
            let finded = JSON.parse(resp).findIndex((idea: any) => idea.id === el.id);
            let aux = JSON.parse(resp);
            console.log(aux, el);
            if(finded === -1) {
                aux.unshift(el);
                setHistoryIdea(aux);
            } else {
                aux.splice(finded, 1);
                aux.unshift(el);
                setHistoryIdea(aux);
            }
            set('@agroi9:historyIdea', JSON.stringify(aux));
        } else {
            let finded = historyIdea.findIndex((idea: any) => idea.id === el.id);
            let aux = historyIdea;
            if(finded === -1) {
                aux.unshift(el);
                setHistoryIdea(aux);
            } else {
                aux.splice(finded, 1);
                aux.unshift(el);
                setHistoryIdea(aux);
            }
            set('@agroi9:historyIdea', JSON.stringify(aux));
        }
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
                            onClick={() => handleClickIdea(idea)}
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
                            onClick={() => handleClickIdea(idea)}
                        />
                    ))}       
                </div>
            </div> 
        </Stack>
    );
}