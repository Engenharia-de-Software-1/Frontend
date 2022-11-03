import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { buttonForgotPassword, buttonRegister, divGeneral, textTitle } from './styles';
import { useAuth } from '../../contexts/authContext';

interface ILogin {
    email: string;
    password: string;
}

export default function Login() {    
    const { signIn } = useAuth();

    const [login, setLogin] = useState<ILogin>({} as ILogin);

    const handleChange = (e: any) => {
        setLogin({
          ...login,
          [e.target.name]: e.target.value //edit
        });
    };

    function goRegisterPage(){
        router.push('/cadastro')
    }
    async function goLoginPage(e: any) {
        e.preventDefault();
        try {
            const response = await signIn(login);
            if(response) {
                if(response.type === 'admin') {
                    router.push(`/administrador?id=${response.user?.id}`)
                } else {
                    // Move para minha conta (Futuramente podemos fazer ir para o dashboard)
                    router.push(`/minhaConta${response.type.split('')[0].toUpperCase() + response.type.split('').slice(1).join('')}?id=${response.user?.id}`);
                }
            } else {
                alert('Erro ao fazer login. Por favor, verifique seus dados e tente novamente.');
            }
        } catch {
            alert('Erro ao fazer login. Por favor, verifique seus dados e tente novamente.');
        }
    }

    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className={divGeneral}>
                <div>    
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo"/>

                    <h1 className={textTitle}>Login</h1>

                    <form onSubmit={goLoginPage} className='w-471'>
                        <div>
                            <Input haslabel name="email" label='E-mail' placeholder='e-mail' top='mt-5' value={login.email || ''} onChange={(e) => handleChange(e)}/>
                            <Input haslabel name="password" label='Senha' placeholder='*******' type='password' top='mt-10' value={login.password || ''} onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className="pt-3 ">
                            <button  className={buttonForgotPassword}>
                                Esqueci minha senha!
                            </button> 
                        </div>

                        <div className='pt-5'>
                            <Button type="submit" bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                                ENTRAR
                            </Button>  
                            
                        </div> 
                    </form>                     
                    <button onClick={goRegisterPage} className={buttonRegister}>
                        Quero me cadastrar na Incubadora Agro I9
                    </button> 
                </div>
            </div>  
        </Stack>
    );
}