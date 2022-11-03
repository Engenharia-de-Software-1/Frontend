import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { buttonStyle, divGeneral, selectStyle, textTitle } from './styles';
import api from '../../services/api';
import { useAuth } from '../../contexts/authContext';

export interface ICadastro {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    profession: string;
    city: string;
    state: string;
}

export default function Registration() {    
    const [buttonStartup, setButtonStartup] = useState(true);
    const [buttonInvestor, setButtonInvestor] = useState(false);
    const [buttonClient, setButtonClient] = useState(false);
    const [buttonCheck, setButtonCheck] = useState(true);
    const { signIn, signUp } = useAuth();

    const [cadastro, setCadastro] = useState<ICadastro>({} as ICadastro);

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

    function useButtonCheck() {
        setButtonCheck(!buttonCheck);
    }

    function goLoginPage(){
        router.push('/login')
    }

    function goRegister(){
        if (buttonStartup == true){
            router.push('/cadastroStartup')
        } else if (buttonInvestor == true){
            router.push('./cadastroInvestidor')
        } else { 
            router.push('/cadastroCliente')
        }
    }

    const handleChange = (e: any) => {
        setCadastro({
          ...cadastro,
          [e.target.name]: e.target.value //edit
        });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        let pathname = '';
        if(buttonClient) pathname = '/client';
        if(buttonStartup) pathname = '/startup';
        if(buttonInvestor) pathname = '/investor';
        if(cadastro.password !== cadastro.confirmPassword) return;
        let userId = '';

        if(!buttonCheck) {
            alert('Você precisa aceitar a Autorização para tratamento de dados para continuar.');
            return;
        }

        try {
            const response = await signUp({path: pathname, data: cadastro});
            console.log(response);
            if(response) {
                userId = response.user.id;
            } else {
                alert('Erro ao fazer cadastro. Por favor, tente novamente.');
                return;
            }
        } catch (err){
            console.log(err)
            alert('Erro ao fazer cadastro. Por favor, tente novamente.');
            return;
        }

        if(buttonClient) pathname = '/cadastroCliente';
        if(buttonStartup) pathname = '/cadastroStartup';
        if(buttonInvestor) pathname = '/cadastroInvestidor';
        
        router.push({
            pathname,
            query: {
                userId,
            }
        });
    }
     
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>


            <div className={divGeneral}>

                <div>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className={textTitle}>Cadastro</h1>

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

                    <form onSubmit={handleSubmit}>
                        <div className=" w-462  mt-5">
                            <Input haslabel onChange={(e) => handleChange(e)} value={cadastro.name} name='name' label='Nome' placeholder='Ex: José da Silva'/>
                            <Input haslabel onChange={(e) => handleChange(e)} value={cadastro.email} name='email' label='E-mail' placeholder='Ex: jose@hotmail.com' top='mt-8'/>
                            <Input haslabel onChange={(e) => handleChange(e)} value={cadastro.password} name='password' label='Senha' placeholder='Sua senha tem que ser maior que 7 digitos' type='password' top='mt-8'/>
                            <Input haslabel onChange={(e) => handleChange(e)} value={cadastro.confirmPassword} name='confirmPassword' label='Confirmação de senha' placeholder='Digite sua senha novamente' type='password' top='mt-8'/>                
                        </div>
                    
                        <div className="pt-8 px-1 ">
                            <label className="flex items-center">
                                <input onChange={useButtonCheck} checked={buttonCheck} type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" />
                                <span className="ml-5 text-gray-600">Autorização para tratamento de dados</span>
                            </label>
                        </div>   

                        <div className='pt-8'>
                            <Button  
                                bg='bg-greenDark' 
                                rounded='rounded-lg' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                formAction='submit'
                            >
                                CADASTRAR
                            </Button>
                            
                            <button onClick={goLoginPage} className={buttonStyle}>
                                Já tenho uma conta na Incubadora Agro I9
                            </button>
                        </div>
                    </form>        
                </div>
            </div>  
        </Stack>
    );
}