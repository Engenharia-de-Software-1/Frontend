
import React, { useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { ButtonProject } from '../../../components/ButtonProject';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useProjects } from '../../../services/queryClient/useProject';

export default function SearchProject() {    
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useProjects();

    const [buttonCheck, setButtonCheck] = useState(false);

    function useButtonCheck() {
        setButtonCheck(!buttonCheck);
    }

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className='flex justify-between items-center'>
                    <h1 className={textTitle}>Lista de projetos</h1>

                    {/* <label className="flex items-center ">
                        <input onClick={useButtonCheck} type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" defaultChecked={buttonCheck} />
                        <span className="ml-2 text-gray-600">filtrar por visualizados por último</span>
                    </label> */}

                </div>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {isLoading || isFetching && (<h1>Carregando projetos...</h1>)}
                    {!isLoading && !isFetching && (data?.length === 0 || data?.filter(el => el.situation === 'aproved').length === 0) && (<h1>Não há nenhum projeto aqui</h1>)}
                    {!isLoading && !isFetching && data?.filter(el => el.situation === 'aproved').map((project) => (
                        <ButtonProject 
                            key={project.id} 
                            project={project} 
                            userType={myData.data?.type as string} 
                        />
                    ))}        
                </div>
            </div>
        </Stack>
    );
}