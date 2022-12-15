import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textStyle3, textTitle } from './styles';
import { useMyData } from '../../services/queryClient/useMyData';

export default function Projetos() {  
    const { data } = useMyData();

    return ( 
        <Stack bg=' bg-white'>
            <Sidebar data={data}/>

            <div className={divGeneral}>
               
                <div>   
                    <h1 className={textTitle}>Consultoria</h1>
                    
                    <h1 className={textStyle3}>Para saber mais envie um e-mail para
                        <span className='font-semibold ml-2'>faleconosco@agroi9incubadora.com.br</span>
                    </h1>
                </div>
            </div>  
        </Stack>
    );
}