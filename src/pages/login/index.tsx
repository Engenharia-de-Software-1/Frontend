import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { buttonForgotPassword, buttonRegister, divGeneral, selectStyle, textTitle } from './styles';

export default function Login() {    
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
    function goLoginPage() {
        if (buttonStartup == true) {
            router.push('/startup')
        }
        else if (buttonInvestor == true) {
            router.push('/investidor')
        }
        else if (buttonClient == true) {
            router.push('/cliente')
        }
        else {
            router.push('/administrador')
        }
    }

    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className={divGeneral}>
                <div>                
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className={textTitle}>Login</h1>

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

                    <div>                        
                        <Input haslabel label='E-mail' placeholder='e-mail' top='mt-5'/>
                        <Input haslabel label='Senha' placeholder='*******' type='password' top='mt-10'/>
                    </div>

                    <div className="pt-3 ">
                        <button  className={buttonForgotPassword}>
                            Esqueci minha senha!
                        </button> 
                    </div>

                    <div className='pt-5'>
                        <Button onClick={goLoginPage} bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                            ENTRAR
                        </Button>  
                        
                        <button onClick={goRegisterPage} className={buttonRegister}>
                            Quero me cadastrar na Incubadora Agro I9
                        </button> 
                    </div>   
                </div>
            </div>  
        </Stack>
    );
}