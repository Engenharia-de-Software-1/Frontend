import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { selectStyle } from './styles';

export default function Registration() {    
    
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className="flex justify-center items-center bg-white h-screen w-full grid direction-column">
                <div>
                
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className="font-semibold text-4xl mt-3">Cadastro startup</h1>

                   

                    <div className=" w-462  mt-5">
                        <Input haslabel label='Nome do representante' placeholder='Ex: José da Silva'/>
                        <Input haslabel label='Nome da startup' placeholder='Ex: Doe sangue' top='mt-10'/>
                        <Input haslabel label='CNPJ' placeholder='00000000000000' top='mt-10'/>
                        <Input haslabel label='Quantidade de pessoas na startup' placeholder='0' type='number' min='0' top='mt-10'/>                
                    </div>

                    <div className='pt-12 flex space-x-10'>
                        <Button bg='bg-green65' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                            VOLTAR
                        </Button> 
                        <Button bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                            CONTINUAR
                        </Button> 

                    </div> 
                </div>
            </div>  
        </Stack>
    );
}