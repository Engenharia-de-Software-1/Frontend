import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import api from '../../services/api';
import { divGeneral, textTitle } from './styles';

interface IPasswordStates {
    confirmPassword: string;
    password: string;
}

export default function ResetPassword() {    
    const router = useRouter();
    const [passwordStates, setPasswordStates] = useState({} as IPasswordStates);
    const [loading, setLoading] = useState(false);

    async function handleResetPassword(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        if(passwordStates.password !== passwordStates.confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
            setLoading(false);
            return;
        } else if(!passwordStates.confirmPassword || !passwordStates.password) {
            alert('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }
        try {
            const response = await api.put(`/forgot/${router.query.token}`, passwordStates);
            if(response.status === 200) {
                alert('Senha alterada com sucesso!');
                setLoading(false);
                router.push('/login');
            } else {
                alert('Erro ao alterar senha. Por favor, tente novamente.');
                setLoading(false);
            }
        } catch {
            alert('Erro ao alterar senha. Por favor, tente novamente.');
            setLoading(false);
        }
    }

    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>
            <div className={divGeneral}>
               <div>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo"/>

                    <h1 className={textTitle}>Redefinir senha</h1>

                    <form className='w-471' onSubmit={handleResetPassword}>
                        <div>
                            <Input 
                                haslabel 
                                name="password" 
                                label='Digite sua nova senha' 
                                placeholder='*******' 
                                type='password' 
                                top='mt-5' 
                                value={passwordStates.password}
                                onChange={(e) => setPasswordStates({ ...passwordStates, password: e.target.value })}
                            />
                            <Input 
                                haslabel 
                                name="password" 
                                label='Confirme sua senha' 
                                placeholder='*******' 
                                type='password' 
                                top='mt-10' 
                                value={passwordStates.confirmPassword}
                                onChange={(e) => setPasswordStates({ ...passwordStates, confirmPassword: e.target.value })}
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
                                disabled={loading}
                            >
                                { loading ? (<Spinner size='sm'/>) : 'SALVAR' }
                            </Button>                          
                        </div> 
                    </form>   
                </div>
            </div>  
        </Stack>
    );
}