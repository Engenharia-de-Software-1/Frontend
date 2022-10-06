import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { selectStyle } from './styles';

export default function Registration() {    
    const [buttonStartup, setButtonStartup] = useState(true);
    const [buttonInvestor, setButtonInvestor] = useState(false);
    const [buttonClient, setButtonClient] = useState(false);

    function useStartupButton() {
        setButtonStartup(true);
        setButtonInvestor(false);
        setButtonClient(false);
    }

    function useInvestorButton() {
        setButtonStartup(false);
        setButtonInvestor(true);
        setButtonClient(false);
    }
    function useClientButton() {
        setButtonStartup(false);
        setButtonInvestor(false);
        setButtonClient(true);
    }
    function goLoginPage(){
        router.push('/login')
    }
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className="flex justify-center items-center bg-white h-screen w-full grid direction-column text-black">
                <div>
                
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className="font-semibold text-4xl mt-3">Cadastro</h1>

                    <div className={selectStyle}>                    
                        <Button 
                            bg={buttonStartup ? 'bg-greenLight' : undefined} 
                            textColor={buttonStartup ? 'text-greenText' : undefined} 
                            textWeight={buttonStartup ? 'font-semibold' : undefined}
                            rounded='rounded-full' 
                            w='w-36' 
                            h='h-8' 
                            onClick={useStartupButton}
                        >
                            Startup
                        </Button>  

                        <Button 
                            bg={buttonInvestor ? 'bg-greenLight' : undefined} 
                            textColor={buttonInvestor ? 'text-greenText' : undefined} 
                            textWeight={buttonInvestor ? 'font-semibold' : undefined}
                            rounded='rounded-full' 
                            w='w-36' 
                            h='h-8' 
                            onClick={useInvestorButton}
                        >
                            Investidor
                        </Button>  
                    
                        <Button 
                            bg={buttonClient ? 'bg-greenLight' : undefined} 
                            textColor={buttonClient ? 'text-greenText' : undefined} 
                            textWeight={buttonClient ? 'font-semibold' : undefined}
                            rounded='rounded-full' 
                            w='w-36' 
                            h='h-8' 
                            onClick={useClientButton}
                        >
                            Cliente
                        </Button>  
                    </div>

                    <div className=" w-462  mt-5">
                        <Input haslabel label='Nome' placeholder='Ex: José da Silva'/>
                        <Input haslabel label='E-mail' placeholder='Ex: jose@hotmail.com' top='mt-10'/>
                        <Input haslabel label='Senha' placeholder='Sua senha tem que ser maior que 7 digitos' type='password' top='mt-10'/>
                        <Input haslabel label='Confirmação de senha' placeholder='Digite sua senha novamente' type='password' top='mt-10'/>                
                    </div>

                    <div className='pt-12'>
                        <Button bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                            CADASTRAR
                        </Button>
                        
                        <button onClick={goLoginPage} className='flex items-center justify-center w-full text-greenText font-bold text-xs underline mt-4'>
                            Já tenho uma conta na Incubadora Agro I9
                        </button>
                    </div>                        

                </div>

            </div>  
        </Stack>
    );
}