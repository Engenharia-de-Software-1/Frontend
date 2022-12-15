import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textStyle3, textTitle } from './styles';
import router from 'next/router';
import api from '../../services/api';
import { IUser } from '../../models/IUser';
import { useMyData } from '../../services/queryClient/useMyData';

export default function Consultoria() {  
    const { data } = useMyData();

    return ( 
        <Stack bg=' bg-white'>
            <Sidebar data={data}/>

            <div className={divGeneral}>
               
                <div>   
                    <h1 className={textTitle}>Consultoria</h1>
                    
                    <h1 className={textStyle3}>Para consultorias envie um e-mail com o assunto 
                        <span className='font-semibold ml-2'>Consultoria AgroI9</span> para
                        <span className='font-semibold ml-2'>faleconosco@agroi9incubadora.com.br</span>
                    </h1>
                </div>
            </div>  
        </Stack>
    );
}