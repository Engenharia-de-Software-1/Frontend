import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { divGeneral, textTitle } from './styles';

export default function Login() {    
    
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className={divGeneral}>
               <div>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo"/>

                    <h1 className={textTitle}>Redefinir senha</h1>

                    <form className='w-471'>
                        <div>
                            <Input 
                                haslabel 
                                name="password" 
                                label='Digite sua nova senha' 
                                placeholder='*******' 
                                type='password' 
                                top='mt-5' 
                            />
                            <Input 
                                haslabel 
                                name="password" 
                                label='Confirme sua senha' 
                                placeholder='*******' 
                                type='password' 
                                top='mt-10' 
                            />
                        </div>

                        <div className='pt-5'>
                            <Button 
                                type="submit" 
                                bg='bg-greenDark' 
                                rounded='rounded-lg' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                            >
                                SALVAR
                            </Button>                          
                        </div> 
                    </form>   
                </div>
            </div>  
        </Stack>
    );
}