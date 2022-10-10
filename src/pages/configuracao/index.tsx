import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textStyle3, textTitle } from './styles';
import router from 'next/router';

export default function ProfileAdmin() {    
    const [buttonChangePassword, setButtonChangePassword] = useState(false);

    function goChangePassword() {
        setButtonChangePassword(true);
    }
    function goDelete() {
        if (window.confirm("Tem certeza que deseja deletar sua conta?")) {
            router.push("./cadastro");
          }
    }

    return ( 
        <Stack bg=' bg-white'>
            <Sidebar/>

            <div className={divGeneral}>
               
                <div>   
                    <h1 className={textTitle}>Configurações</h1>
                    
                    <h1 className={textStyle3}>Mudar senha</h1>

                    <div className=" w-462">                        
                        <Input haslabel label='Senha atual' placeholder='******' type='password' top='mt-5'/>
                        <Input haslabel label='Nova senha' placeholder='******' type='password' top='mt-10'/>
                    </div>

                    <div className='pt-12'>
                        <Button 
                            bg='bg-greenDark' 
                            rounded='rounded-lg' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={goChangePassword}
                            >
                            MUDAR SENHA
                        </Button>
                    </div> 

                    <div >   
                        <h1 className={textStyle3}>Área de perigo</h1>
                        
                        <div className='pt-5 pb-10'>
                            <Button 
                                bg='bg-warning' 
                                rounded='rounded-lg' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                onClick={goDelete}
                                >
                                DELETAR CONTA
                            </Button>
                        </div> 
                    </div>
                </div>
            </div>  
        </Stack>
    );
}