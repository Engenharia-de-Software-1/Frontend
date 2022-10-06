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
    const [buttonAdmin, setButtonAdmin] = useState(false);

    function useStartupButton() {
        setButtonStartup(true);
        setButtonInvestor(false);
        setButtonClient(false);
        setButtonAdmin(false);
    }

    function useInvestorButton() {
        setButtonStartup(false);
        setButtonInvestor(true);
        setButtonClient(false);
        setButtonAdmin(false);
    }
    function useClientButton() {
        setButtonStartup(false);
        setButtonInvestor(false);
        setButtonClient(true);
        setButtonAdmin(false);
    }
    function useAdminButton() {
        setButtonStartup(false);
        setButtonInvestor(false);
        setButtonClient(false);
        setButtonAdmin(true);
    }
    function goRegisterPage(){
        router.push('/cadastro')
    }

    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className="flex justify-center items-center bg-white h-screen w-full grid direction-column text-black">
                <div>
                
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className="font-semibold text-4xl mt-3">Login</h1>

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

                        <Button 
                            bg={buttonAdmin ? 'bg-greenLight' : undefined} 
                            textColor={buttonAdmin ? 'text-greenText' : undefined} 
                            textWeight={buttonAdmin ? 'font-semibold' : undefined}
                            rounded='rounded-full' 
                            w='w-48' 
                            h='h-8' 
                            onClick={useAdminButton}
                        >
                            Administrador
                        </Button> 
                    </div>

                    <div className=" w-462  mt-5">                        
                        <Input haslabel label='E-mail' placeholder='e-mail' top='mt-10'/>
                        <Input haslabel label='Senha' placeholder='*******' type='password' top='mt-10'/>
                     </div>

                    <div className='pt-12'>
                        <Button bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                            ENTRAR
                        </Button>  

                        <button onClick={goRegisterPage} className='flex items-center justify-center w-full text-greenText font-bold text-xs underline mt-4'>
                            Quero me cadastrar na Incubadora Agro I9
                        </button> 
                    </div>                        

                </div>

            </div>  
        </Stack>
    );
}