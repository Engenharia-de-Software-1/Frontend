import React, { useState } from 'react';
import { Buttons } from '../../components/Buttons/Buttons';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';

export default function Registration() {    
    const [buttom1, setButton1] = useState(true);
    const [buttom2, setButton2] = useState(true);
    const [buttom3, setButton3] = useState(true);

    function useButton1() {
        setButton1(true);
        setButton2(false);
        setButton3(false);
    }

    function useButton2() {
        setButton1(false);
        setButton2(true);
        setButton3(false);
    }
    function useButton3() {
        setButton1(false);
        setButton2(false);
        setButton3(true);
    }
// não consegui colocar as imagens ainda
// problema no h do input
// falta fazer funcionar os botões para eles ficarem verdes quando clicado
    return ( 
        <Stack bg='bg-white'>
            <div className="bg-black h-screen w-559">
                
            </div>

            <div className="flex justify-center items-center bg-white h-screen w-screen grid direction-column">
                <div>
                    <h1 className="font-semibold text-4xl">Cadastro</h1>

                    <div className="flex bg-optionWhite h-12 w-471 rounded-full direction-row items-center justify-center mt-5">                    
                        <Buttons bg='bg-optionWhite' rounded='rounded-full' w='w-36' h='h-8' onClick={useButton1}>
                            Startup
                        </Buttons>  

                        <Buttons bg='bg-optionWhite' rounded='rounded-full' w='w-36' h='h-8' onClick={useButton2}>
                            Investidor
                        </Buttons>

                        <Buttons bg='bg-optionWhite' rounded='rounded-full' w='w-36' h='h-8' onClick={useButton3}>
                            Cliente
                        </Buttons>
                    </div>

                    <div className=" w-462  mt-5">
                        <Input haslabel label='Nome' placeholder='Ex: José da Silva' top='mt-1'/>
                        <Input haslabel label='E-mail' placeholder='Ex: jose@hotmail.com' top='mt-1'/>
                        <Input haslabel label='Senha' placeholder='Sua senha tem que ser maior que 7 digitos' type='password' top='mt-1'/>
                        <Input haslabel label='Confirmação de senha' placeholder='Digite sua senha novamente' type='password' top='mt-1'/>                
                    </div>

                    <div className='pt-7'>
                        <Buttons bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12'>
                            CADASTRAR
                        </Buttons>
                        
                        <button className='text-greenText font-bold text-xs underline mt-2'>
                            Já tenho uma conta na Incubadora Agro I9
                        </button>
                    </div>                        

                </div>

            </div>  
        </Stack>
    );
}