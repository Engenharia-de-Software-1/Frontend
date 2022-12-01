import router from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { buttonForgotPassword, buttonRegister, divGeneral, textTitle } from './styles';
import { useAuth } from '../../contexts/authContext';
import { Spinner } from '@chakra-ui/react';
import { Modal } from '../../components/Modal';
import api from '../../services/api';

interface ILogin {
    email: string;
    password: string;
}

interface RecoveryEmail{
    email: string;
    openRecoveryModal: boolean;
}

export default function Login() {    
    const { signIn } = useAuth();

    const [login, setLogin] = useState<ILogin>({} as ILogin);
    const [loading, setLoading] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState<RecoveryEmail>({} as RecoveryEmail);

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
        setLoading(true);
        try {
            const response = await signIn(login);
            if(response) {
                setLoading(false);
                if(response.type === 'admin') {
                    router.push(`/minhaConta${response.type.split('')[0].toUpperCase() + response.type.split('').slice(1).join('')}?id=${response.user}`)
                } else {
                    // Move para minha conta (Futuramente podemos fazer ir para o dashboard)
                    router.push(`/minhaConta${response.type.split('')[0].toUpperCase() + response.type.split('').slice(1).join('')}?id=${response.user}`);
                }
            } else {
                setLoading(false);
                alert('Erro ao fazer login. Por favor, verifique seus dados e tente novamente.');
            }
        } catch {
            setLoading(false);
            alert('Erro ao fazer login. Por favor, verifique seus dados e tente novamente.');
        }
    }

    async function sendRecoveryPassword(e : any){
        e.preventDefault();
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/g.test(recoveryEmail.email)){
            const response = await api.post('/forgot', {email: recoveryEmail.email});
            if(response.data.status === true){
                alert('Email enviado com sucesso! Verifique sua caixa de entrada.');
                setRecoveryEmail({email: '', openRecoveryModal: false});
            } else {
                alert('Erro ao enviar email. Por favor, tente novamente.');
            }
        } else {
            alert('E-mail preenchido errado.');
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


                        <div className='pt-5'>
                            <Button disabled={loading} type="submit" bg='bg-greenDark' rounded='rounded-lg' w='w-full' h='h-12' textColor='text-white' textWeight='font-bold'>
                                { loading ? (
                                    <Spinner size='sm'/>
                                ) : 'ENTRAR' }
                            </Button>  
                            
                        </div> 
                    </form>                     
                                        
                    <button  className={buttonForgotPassword} onClick={()=> {setRecoveryEmail({...recoveryEmail, openRecoveryModal: true})}}>
                        Esqueci minha senha!
                    </button>                   
                  
                    <button onClick={goRegisterPage} className={buttonRegister}>
                        Quero me cadastrar na Incubadora Agro I9
                    </button> 
                </div>
            </div>  
            <Modal 
                isOpen={recoveryEmail.openRecoveryModal}
                onClose={() => {setRecoveryEmail({...recoveryEmail, openRecoveryModal: false})}}
                title='Recuperação de senha'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={(e) => {sendRecoveryPassword(e)}}
                    >
                        Enviar e-mail
                    </Button>
                }
            >
                <div className='relative' >
                    <Input 
                        type="email" 
                        name='Recovery Email' 
                        id='recovery_email' 
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-grayBg rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                        value={recoveryEmail.email || ''}
                        onChange={(e) => setRecoveryEmail({...recoveryEmail, email: e.target.value})}
                    />
                    <label 
                        className="absolute text-sm text-grey-500 dark:text-grey-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-60 peer-focus:-translate-y-4 left-1"
                    >E-mail
                    </label>
                    
                </div>
            </Modal>
        </Stack>
    );
}