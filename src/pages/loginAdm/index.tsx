import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { buttonForgotPassword, buttonRegister, divGeneral, selectStyle, textTitle } from './styles';

export default function Login() {    
      
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className={divGeneral}>
                <div>    
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className={textTitle}>Login do administrador</h1>

                    <div>                        
                        <Input haslabel label='E-mail' placeholder='e-mail' top='mt-10'/>
                        <Input haslabel label='Senha' placeholder='*******' type='password' top='mt-10'/>
                    </div>

                    <div className="pt-3 ">
                        <button  className={buttonForgotPassword}>
                            Esqueci minha senha!
                        </button> 
                    </div>

                    <div className='pt-5'>
                        <Button  bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                            ENTRAR
                        </Button>                          
                    </div>   
                </div>
            </div>  
        </Stack>
    );
}