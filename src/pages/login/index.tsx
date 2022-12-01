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

export default function Login() {    
    const { signIn } = useAuth();

    const [login, setLogin] = useState<ILogin>({} as ILogin);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(
        {
            title: '',
            isSucess: false,
        }
    );

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
    
    const verifyEmail = (email: string) => {
        if (email) {
            const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if (!emailRegex.test(email)) {
                setModalMessage({
                    title: 'Por favor, insira um email válido.',
                    isSucess: true,
                });
                setModal(true);
                setLoading(false);
                return false;
            }
        }
        setLoading(false);
        return true;
    }


    function handleForgotPassword(e: any) {
        e.preventDefault();
        setLoading(true);
        if (!verifyEmail(login.email)) {
            return;
        }
        try {
            if (login.email) {
                api.post('/forgot', { email: login.email }).then(response => {
                    if (response.status === 201) {
                        setLoading(false);
                        setModalMessage({
                            title: 'Se esse usuário existe em nossa plataforma, você receberá um token de redefinição de senha pelo email!',
                            isSucess: true,
                        });
                        return;
                    }
                    setLoading(false);
                    setModalMessage({
                        title: 'Erro ao enviar email. Por favor, tente novamente.',
                        isSucess: true,
                    });
                    return;                    
                })
                    
            }   else {
                setLoading(false);
                setModalMessage({
                    title: 'Por favor, preencha o campo de email.',
                    isSucess: true,
                });
            }   

        } catch {
            setLoading(false);
            alert('Erro ao enviar email. Por favor, tente novamente.');
        }
    }

    
    return ( 
        <Stack bg='bg-white'>
            <Modal 
            isOpen={modal} 
            onClose={() => 
                {
                    setModal(false);
                    setModalMessage({
                        title: '',
                        isSucess: false,
                    });
                    login.email = '';
                }
            } 
            title='Esqueci minha senha'
            footer={<></>}
            > 

           { modalMessage.isSucess ? (<> 
                <p>{modalMessage.title}</p>
                <Button onClick={
                    () => {
                        
                        setModalMessage({
                            title: '',
                            isSucess: false,
                        });
                    }
                } disabled={loading} type="submit" bg='bg-greenDark' rounded='rounded-lg' style={{padding:'1rem', display: 'flex', marginTop: '1rem'}} h='h-12' textColor='text-white' textWeight='font-bold'>
                        { loading ? (
                             <Spinner size='sm'/>
                        ) : 'Voltar' }
                    </Button>    
            </>) 
            :
           ( <form onSubmit={handleForgotPassword}>
                <div>
                   <Input haslabel name="email" label='Insira seu email' placeholder='e-mail' top='mt-5' value={login.email || ''} onChange={(e) => handleChange(e)}/>
                </div>
                <div className='pt-5 justify-end flex'>
                    <Button disabled={loading} type="submit" bg='bg-greenDark' rounded='rounded-lg' style={{padding:'1rem', display: 'flex'}} h='h-12' textColor='text-white' textWeight='font-bold'>
                        { loading ? (
                             <Spinner size='sm'/>
                        ) : 'Enviar' }
                    </Button>                              
                </div> 
            </form>  )
}
            </Modal>
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
                                        
                    <button className={buttonForgotPassword} onClick={() => setModal(true)}>
                        Esqueci minha senha!
                    </button>                   
                  
                    <button onClick={goRegisterPage} className={buttonRegister}>
                        Quero me cadastrar na Incubadora Agro I9
                    </button> 
                </div>
            </div>  
        </Stack>
    );
}