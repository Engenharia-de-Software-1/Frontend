import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, divInput, textStyle3, textTitle } from './styles';

export default function ProfileAdmin() {    
    const [buttonEditMyAccount, setButtonEditMyAccount] = useState(false);
    const [buttonEditStartup, setButtonEditStartup] = useState(false);
    const [buttonEditAddress, setButtonEditAddress] = useState(false);

    function goEditMyAccount() {
        setButtonEditMyAccount(true);
        setButtonEditStartup(false);
        setButtonEditAddress(false);
    }
    function goEditStartup() {
        setButtonEditMyAccount(false);
        setButtonEditStartup(true);
        setButtonEditAddress(false);
    }
    function goEditAddress() {
        setButtonEditMyAccount(false);
        setButtonEditStartup(false);
        setButtonEditAddress(true);
    }

    return ( 
        <Stack bg=' bg-white'>
            <Sidebar/>

            <div className={divGeneral}>
               
                <div className="w-full">   
                    <h1 className={textTitle}>Minha conta</h1> 

                    <div className={divInput}>                        
                        <Input haslabel label='Nome' placeholder='nome completo' top='mt-5'/>
                        <Input haslabel label='E-mail' placeholder='e-mail' top='mt-5'/>
                    </div>

                    <div className='pt-12'>
                        <Button 
                            bg='bg-greenDark' 
                            rounded='rounded-lg' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={goEditMyAccount}
                            >
                            EDITAR
                        </Button>
                    </div> 

                    <div >   
                        <h1 className={textStyle3}>Dados da startup</h1>

                        <div className={divInput}>                        
                            <Input haslabel label='Nome do representante' placeholder='nome completo' top='mt-5'/>
                            <Input haslabel label='Nome da startup' placeholder='nome completo' top='mt-5'/>
                        </div>

                        <div className={divInput}>                        
                            <Input haslabel label='CNPJ' placeholder='00000000000000' top='mt-10'/>
                            <Input haslabel label='Quantidade de pessoas na startup' placeholder='0' type='number' min='0' top='mt-10'/>
                        </div>

                        <div className='pt-12'>
                            <Button 
                                bg='bg-greenDark' 
                                rounded='rounded-lg' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                onClick={goEditStartup}
                                >
                                EDITAR
                            </Button>
                        </div> 
                    </div>

                    <div >   
                        <h1 className={textStyle3}>Endereço</h1>
                        <div className='pt-12'>
                            <Button 
                                bg='bg-greenDark' 
                                rounded='rounded-lg' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                onClick={goEditAddress}
                                >
                                EDITAR NO MAPA
                            </Button>
                        </div> 
                    </div>
                </div>
            </div>  
        </Stack>
    );
}